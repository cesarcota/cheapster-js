Template.GroupName.helpers({
  groupName(){

    return Session.get("sessionGroup").groupName;
  }
});

Template.listUsers.helpers({
  userList(){
  var  usersList =  [];
    usersList.splice(0,0,Session.get("sessionGroup").users);

    console.log("users ", usersList);
    return usersList;
  }
});
