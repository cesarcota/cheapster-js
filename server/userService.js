import {Meteor} from 'meteor/meteor';

Meteor.methods({
  addUser: function(userData){

    var userID = Users.insert(userData);
    console.log("ID: "+userID);
    return userID;

    }
});

Meteor.methods({
  findByEmail: function(emailVar){
    var user = Users.findOne({email:emailVar});
    console.log("SERVER SIDE 1: "+user);
    return user;
  }

});



Meteor.methods({
  findGroups: function(user){
    console.log("USERSERVICE: "+user.email);
    var groups = Users.find({groups});
    console.log("USERSERVICE GROUPS: "+groups[0]);
    return groups;
  }
})
