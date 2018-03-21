Template.newRound.events({
    "click .newEvent": function(event) {
        event.preventDefault();
        var groupId = this._id;
        Router.go("/group-status/" + groupId + "/event");
    }
});
