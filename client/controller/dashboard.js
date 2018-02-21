if(Meteor.isClient){

  var database = Meteor.subscribe('listUsers');


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
    //allUsers(){ return Meteor.users.find({}); },
    email(){ return Meteor.user().emails[0].address; }
  });


  Template.listgroups.helpers({
    allUsers(){ return Meteor.users.find({}); },
    group(){
      console.log("NEXT");
      console.log("USER. "+Meteor.user().emails[0].address);
      return this.emails[0].address;
    }
  });



}
