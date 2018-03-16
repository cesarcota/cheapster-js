if (Meteor.isClient) {
    Template.newgroup.events({
        "submit .addGroup": function(event) {
            event.preventDefault();
            var groupName = event.target.groupName.value;
            var category;
            //if there is a new group type, add it to the group
            if (Session.get("newType") === true) {
                category = event.target.newType.value;
                var typeArray = Session.get("sessionUser").customTypes;
                console.log("TYPE ARRAY" + typeArray);
                typeArray.splice(typeArray.length - 1, 0, category);
                console.log("ARRAY: " + typeArray);
                console.log("CATEGORY (TRUE): " + category);
                //FAZER O UPDATE AO USER

                Meteor.call(
                    "updateUser",
                    Session.get("sessionUser")._id,
                    typeArray,
                    function(error, result) {
                        if (!error) {
                            console.log("CHECK ARRAY: ", typeArray);
                            console.log(
                                "USER EMAIL: ",
                                Session.get("sessionUser").email
                            );

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
                users: []
            };
            groupData.users.push(Session.get("sessionUser"));

            Meteor.call("addGroup", groupData);

            Router.go("/dashboard");
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
}
