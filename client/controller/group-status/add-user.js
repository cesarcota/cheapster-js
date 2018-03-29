import addFriend from "../addgroup/group-users.js";

Template.addUsersToGroup.events({
    "click .addUser": function(event) {
        var groupId = this._id;
        Router.go("/group-status/" + groupId + "/add-friend");
    }
});

Template.updateFriendsGroup.events({
    "click .submitFriends": function(event) {
        var tempList = addFriend();
        var groupId = this._id;
        var groupUsers = this.users;
        var groupLength = groupUsers.length;
        var invalidEmail = false;
        //It may happen that the user doesn't give any new mail, so it needs to have a way to bypass this process
        if (tempList.length === 0) {
            Router.go("/group-status/" + groupId);
        }

        tempList.forEach(function(email, index) {
            Meteor.call("findByEmail", email, function(error, result) {
                if (!error) {
                    if (result === undefined) {
                        FlashMessages.sendError(
                            "The mail " + email + " does not exist"
                        );
                        invalidEmail = true;
                        return;
                    } else {
                        groupUsers.push(result);
                        groupUsers[index + groupLength].accuracy = 0;
                        groupUsers[index + groupLength].roundsPresent = 0;
                        groupUsers[index + groupLength].payedRounds = 0;
                    }

                    //Then checks if the loop in tempList has ended, then it does the update
                    if (tempList.length - 1 === index) {
                        if (invalidEmail === false) {
                            Meteor.call(
                                "addFriend",
                                groupId,
                                groupUsers,
                                function(error) {
                                    if (!error) {
                                        Router.go("/group-status/" + groupId);
                                    }
                                }
                            );
                        }
                    }
                }
            });
        });
    }
});
