Template.listUsers.helpers({
    userList() {
        var usersList = this.users;
        //Now a new object is build to have the desired properties and calc the accuracy:
        var usersListToRender = [];
        usersList.forEach(function(user) {
            var updatedUser = {
                displayName: user.displayName,
                accuracy: user.accuracy * 100
            };
            usersListToRender.push(updatedUser);
        });
        return usersListToRender;
    }
});
