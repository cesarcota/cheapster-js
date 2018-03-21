Template.listUsers.helpers({
    userList() {
        var usersList = this.users;

        console.log("users ", this);
        return usersList;
    }
});
