import {Meteor} from 'meteor/meteor';

Meteor.methods({
  addGroup: function(groupData){
    var groupId = Groups.insert(groupData);
    console.log("GROUP NAME: "+groupData.groupName+" GROUP ID: "+groupId);
    console.log("GROUP TYPE: "+groupData.category);
    console.log("GROUP USERS: "+groupData.users.displayName);
return groupId;

    }
});


Meteor.methods({
  findGroupsByUser: function(user){
    var groups = Groups.find({users: user}).fetch();
    return groups;
  }
});

Meteor.methods({
  listUsers: function(user){
    var groups = Groups.find({users: user}).fetch();
    var names="";
    groups.forEach(function(element){
      //console.log("USERS IN GROUP: "+names+" "+element.users.displayName);
      names= names+" "+element.users.displayName;
      //console.log("USERS IN GROUP: ",element.users.displayName);
    });
    console.log("NAMES: ",names);
    return names;

    }
})

/*
Meteor.methods({
  findByEmail: function(emailVar){
    var user = Users.findOne({email:emailVar});
    console.log("SERVER SIDE 1: "+user);
    return user;
  }

});
*/
