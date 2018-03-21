import addFriend from "./group-users.js";

Template.newgroup.events({
    "click .addGroup": function(event) {
        event.preventDefault();
        var groupName = document.getElementById("groupName").value;
        var category;
        //if there is a new group type, add it to the group
        if (Session.get("newType") === true) {
            category = document.getElementById("newType").value;
            var typeArray = Session.get("sessionUser").customTypes;

            typeArray.splice(typeArray.length - 1, 0, category);

            //FAZER O UPDATE AO USER

            Meteor.call(
                "updateUser",
                Session.get("sessionUser")._id,
                typeArray,
                function(error, result) {
                    if (!error) {
                        Meteor.call(
                            "findByEmail",
                            Session.get("sessionUser").email,
                            function(error, user) {
                                if (!error) {
                                    console.log(
                                        "CUSTOM TYPES: " + user.customTypes
                                    );
                                }
                            }
                        );
                    }
                }
            );
        } else {
            category = Session.get("chosenType");
            console.log("CATEGORY (FALSE): " + category);
        }

        //Checks if the fields of the group name and type are filled
        if (groupName === "" || groupName === null) {
            FlashMessages.sendError("The group name must be filled.");
            return;
        }

        //Checks if the type is chosenType
        if (category === undefined) {
            FlashMessages.sendError("The type must be chosen.");
            return;
        }

        //Add the new group to the database
        var groupData = {
            groupName: groupName,
            category: category,
            users: [],
            rounds: 0
        };

        //Var accuse some error during the add of a user
        var invalidEmail = false;

        //This will be done to guarantee that the view of the dashboard will only be called after all the checks
        var tempList = addFriend();
        console.log("TEMP LIST FIRST STEP: ", tempList);

        tempList.push(Session.get("sessionUser").email);

        tempList.forEach(function(email, index) {
            console.log("TEMP LIST: ", tempList);
            Meteor.call("findByEmail", email, function(error, result) {
                if (!error) {
                    if (result === undefined) {
                        FlashMessages.sendError(
                            "The mail " + email + " does not exist"
                        );
                        invalidEmail = true;
                        return;
                    } else {
                        groupData.users.push(result);
                        groupData.users[index].accuracy = 0;
                        groupData.users[index].roundsPresent = 0;
                        groupData.users[index].payedRounds = 0;
                        console.log("DATA: ", groupData);
                    }

                    //Then checks if the loop in tempList has ended
                    if (tempList.length - 1 === index) {
                        if (invalidEmail === false) {
                            Meteor.call("addGroup", groupData);
                            Router.go("/dashboard");
                        }
                    }
                }
            });
        });
    }
});

Template.categories.helpers({
    categories: function() {
        //Reset the variables
        Session.set("newType", false);
        Session.set("chosenType", undefined);
        return Session.get("sessionUser").customTypes;
    }
});

Template.categories.events({
    "change #category-select": function(event, template) {
        var category = $(event.currentTarget).val();

        if (category === "Other") {
            Session.set("newType", true);
        } else {
            Session.set("newType", false);
            //This will store the value chosen by the user in the select command
            Session.set("chosenType", category);
        }
    }
});

Template.newgroup.helpers({
    addNewType() {
        if (Session.get("newType") === true) {
            //This is to show the space to create a new group type
            return Session.get("newType");
        }
    }
});

//Template to add new categories to the user memory, that he adds
