Template.addUsersToGroup.events({
    "click .addUser": function(event) {
        var groupId = this._id;
        Router.go("/group-status/" + groupId + "/add-friend");
    }
});
