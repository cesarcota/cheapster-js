import { Meteor } from 'meteor/meteor';

Meteor.startup(function(){
  // code to run on server at startup
  Meteor.publish('allEmails',function(){
  // you should restrict this publication to only be available to admin users
  return Meteor.users.find({},{fields: { email: 1 }});
});

});
