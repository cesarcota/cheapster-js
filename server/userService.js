import {Meteor} from 'meteor/meteor';

Meteor.methods({
  addUser: function(userData){

    var userID = Users.insert(userData);
    return userID;

    }
});

Meteor.methods({
  findByEmail: function(emailVar){
    var user = Users.findOne({email:emailVar});
    return user;
  }

});

Meteor.methods({
  findGroups: function(user){
    var groups = Users.findOne({groups});
    return groups;
  }
});


Meteor.methods({
  updateUser:function(userId, categories){
    Users.update({_id:userId}, {$set:{customTypes:categories}});
  }
});
