import {Meteor} from 'meteor/meteor';

Meteor.methods({
  addGroup: function(groupData){
    var groupId = Groups.insert(groupData);
    console.log("GROUP NAME: "+groupData.groupName+" GROUP ID: "+groupId);
    console.log("GROUP TYPE: "+groupData.category);
    console.log("GROUP USERS: "+groupData.users.displayName);
    //CHECK THIS TOMORROW
    console.log("GROUP Data: "+groupData);
return groupId;

    }
});


Meteor.methods({
  findGroupsByUser: function(user){
    var groups = Groups.find({users: user}).fetch();
    return groups;
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
