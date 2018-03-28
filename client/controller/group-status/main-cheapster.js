Template.mainCheapster.rendered = function() {
    var groupId = this.data._id;
    //Store this id in the session. This is to bypass the cookies
    Meteor.call("findGroupById", groupId, function(error, group) {
        if (!error) {
            Session.set("sessionGroup", group);
        }
    });
};

Template.mainCheapster.helpers({
    cheapster() {
        var groupUsers = this.users;

        //Now it needs to select the person with the lowest ratio accuracy
        var tempCheapster = 1;
        var mainCheapster;
        groupUsers.forEach(function(userAccuracy) {
            if (userAccuracy.accuracy <= tempCheapster) {
                mainCheapster = userAccuracy.displayName;
                tempCheapster = userAccuracy.accuracy;
            }
        });
        return mainCheapster;
    },

    numberRounds() {
        return this.rounds;
    }
});
