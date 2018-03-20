Template.dashboard.events({
    "click .logout": function(event) {
        event.preventDefault();
        //To log out
        Session.set("sessionUser", undefined);
        Router.go("/login");
    },

    "click .newgroup": function(event) {
        event.preventDefault();
        Router.go("/newgroup");
    }
});

Template.hello.helpers({
    displayName() {
        return Session.get("sessionUser").displayName;
    }
});

Template.listgroups.rendered = function() {
    Meteor.call("findGroupsByUser", Session.get("sessionUser")._id, function(
        error,
        groups
    ) {
        if (!error) {
            Meteor.call("listUsers", Session.get("sessionUser")._id, function(
                error,
                result
            ) {
                if (!error) {
                    //CHANGE THIS
                    result.forEach(function(element, index) {
                        var names = "";
                        //console.log("USERS IN GROUP: "+names+" "+element.users.displayName);
                        var groupUsersNames = element.users;

                        Object.keys(groupUsersNames).forEach(function(key) {
                            names =
                                names + " " + groupUsersNames[key].displayName;
                        });

                        element.userNames = names;
                        groups[index].userNames = names;
                    });
                    Session.set("groupList", groups);
                }
            });
        }
    });
};

Template.listgroups.helpers({
    groupList() {
        return Session.get("groupList");
    }
});

Template.listgroups.events({
    "click .select-group": function(event) {
        event.preventDefault();
        var groupId = $(event.currentTarget).val();
        Meteor.call("findGroupById", groupId, function(error, group) {
            if (!error) {
                //Stores this group in a session variable so it can be used in the next view
                console.log("ID: ", groupId);
                Session.set("sessionGroup", group);
                Router.go("/group-status/" + groupId);
            }
        });
    }
});

//The next 2 templates are used to show the uses in each group, together with the name of
//the group
