import {Meteor} from 'meteor/meteor';

Meteor.methods({
  addGroup: function(groupData){
    var groupId = Groups.insert(groupData);
    return groupId;

    }
});


Meteor.methods({
  findGroupsByUser: function(userId){
    //CHECK THIS
    var groups = Groups.find({"users._id": userId}).fetch();
    return groups;
  }
});

Meteor.methods({
  findGroupById: function(groupId){
    var group = Groups.findOne({_id: groupId});
    return group;
  }
});

Meteor.methods({
  listUsers: function(user){
    var groups = Groups.find({users: user}).fetch();
    return groups;

    }
});


/*
Meteor.methods({
  findByEmail: function(emailVar){
    var user = Users.findOne({email:emailVar});
    console.log("SERVER SIDE 1: "+user);
    return user;
  }

});
*/
