if(Meteor.isClient){

  Meteor.subscribe('allEmails');


  Template.dashboard.events({

    //allUsers(){ return Meteor.users.find({}); },
    //email(){ return this.emails[0].address; },

    "click .logout": function (event){
      event.preventDefault();
      Meteor.logout();
    }
  });

  Template.hello.helpers({
    allUsers(){ return Meteor.users.find({}); },
    email(){ return this.emails[0].address; }
});


}
