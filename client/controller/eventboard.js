Template.eventBoard.helpers({
    usersTable() {
        //This will show the users in this group
        var usersList = this.users;
        var userId = Session.get("sessionUser")._id;

        return usersList;
    },

    usersName() {
        var usersList = this.users;
        usersList.forEach(function(user, index) {
            var accuracy = user.accuracy;
            usersList[index].accuracy *= 100;
        });

        return usersList;
    }
});

Template.radio.rendered = function() {
    $("input[name=payed][value=" + Session.get("sessionUser")._id + "]").prop(
        "checked",
        true
    );
};

Template.eventBoard.events({
    "click .createEvent": function(event) {
        var users = this.users;
        var groupRounds = this.rounds;
        var usersPresent = [];
        var paidPerson;
        users.forEach(function(element, index) {
            //Search in the checkboxs to see which ones are selected
            var isPresent = $("#" + element._id + ":checked").val();
            var payed = $("input[name=payed]:checked", ".eventTable").val();

            //This is to increase the number of rounds present by the user
            if (isPresent !== undefined) {
                //Increase the number of rounds in the user
                element.roundsPresent += 1;
                usersPresent.push(element);
            }
            //This is to determine which one is the person who payed
            if (payed === element._id) {
                element.payedRounds += 1;
                paidPerson = element.displayName;
            }
            //Update their accuracy
            var tempAccuracy = element.accuracy;
            tempAccuracy = element.payedRounds / element.roundsPresent;

            element.accuracy = Math.round(tempAccuracy * 100) / 100;
        });

        //Increase the number of rounds of the group
        var updateRounds = (groupRounds += 1);
        var groupId = this._id;

        //Then update the database of the groups with the new changes in the users
        Meteor.call("updateGroupUsers", groupId, users, updateRounds, function(
            error,
            result
        ) {
            if (!error) {
                //Then it creates an event with what happened here
                var eventData = {
                    groupId: groupId,
                    paidPerson: paidPerson,
                    usersPresent: usersPresent
                };
                Meteor.call("addEvent", eventData);
                Router.go("/group-status/" + groupId);
            }
        });
    }
});
