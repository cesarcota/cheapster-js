if(Meteor.isClient){

  Meteor.subscribe('allEmails');
  Meteor.subscribe('allGroups');


  Template.dashboard.events({

    //allUsers(){ return Meteor.users.find({}); },
    //email(){ return this.emails[0].address; },

    "click .logout": function (event){
      event.preventDefault();
      Meteor.logout();
    },

    "click .newgroup": function (event){
      event.preventDefault();
      Router.go("/newgroup");
    }

  });

  Template.hello.helpers({
    allUsers(){ return Meteor.users.find({}); },
    email(){ return this.emails[0].address; }
  });

  Template.listgroups.helpers({
    groups(){ return Meteor.user().groups; }
  });


}
