Template.mainCheapster.helpers({
    cheapster() {
        var groupUsers = this.users;
        console.log("GROUP USER: ", groupUsers);

        //Now it needs to select the person with the lowest ratio accuracy
        var tempCheapster = 1;
        var mainCheapster;
        groupUsers.forEach(function(userAccuracy) {
            console.log("USER ACCURACY: ", userAccuracy);
            if (userAccuracy.accuracy <= tempCheapster) {
                mainCheapster = userAccuracy.displayName;
            }
        });
        console.log("MAIN CHEAPSTER: ", mainCheapster);
        return mainCheapster;
    },

    numberRounds() {
        return this.rounds;
    }
});
