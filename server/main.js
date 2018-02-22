import { Meteor } from 'meteor/meteor';

Meteor.startup(function(){
  // code to run on server at startup

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
    return user;
  }
});


})
