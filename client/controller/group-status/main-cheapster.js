Template.mainCheapster.helpers({
    cheapster() {
        var groupUsers = this.users;

        //Now it needs to select the person with the lowest ratio accuracy
        var tempCheapster = 1;
        var mainCheapster;
        console.log("GROUP USERS: ", groupUsers);
        groupUsers.forEach(function(userAccuracy) {
            console.log("USER ACCURACY: ", userAccuracy);
            console.log("TEMP CHEAPSTER: ", tempCheapster);
            if (userAccuracy.accuracy <= tempCheapster) {
                mainCheapster = userAccuracy.displayName;
                console.log("MAIN CHEAPSTER: ", mainCheapster);
                tempCheapster = userAccuracy.accuracy;
            }
        });
        return mainCheapster;
    },

    numberRounds() {
        return this.rounds;
    }
});
