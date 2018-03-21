Template.mainCheapster.helpers({
    cheapster() {
        var groupUsers = this.users;
        console.log("GROUP USER UPDATED: ", groupUsers);

        //Now it needs to select the person with the lowest ratio accuracy
        var tempCheapster = 1;
        var mainCheapster;
        groupUsers.forEach(function(userAccuracy) {
            if (userAccuracy.accuracy <= tempCheapster) {
                mainCheapster = userAccuracy.displayName;
                tempCheapster = mainCheapster;
            }
        });
        return mainCheapster;
    },

    numberRounds() {
        return this.rounds;
    }
});
