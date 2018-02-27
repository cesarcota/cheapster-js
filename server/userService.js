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
  updateUser:function(user, categories){
    Users.update(user, {$set:{customTypes:categories}},function(error)){
      if(error){
        console.log("ERROR");
      }else{
        console.log("RIGHT");
        console.log("USER: ",user.customTypes);
      }
    }
  }
})
