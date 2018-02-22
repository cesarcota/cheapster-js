import {Meteor} from 'meteor/meteor';

Meteor.methods({
  addGroup: function(groupData){
    var groupId = Groups.insert(groupData);
    return groupId;

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
