if(Meteor.isClient){

  Template.dashboard.events({

    //allUsers(){ return Meteor.users.find({}); },
    //email(){ return this.emails[0].address; },

    "click .logout": function (event){
      event.preventDefault();
      //To log out
      Session.set("sessionUser", undefined);
      Router.go("/login");
    },

    "click .newgroup": function (event){
      event.preventDefault();
      Router.go("/newgroup");
    }

  });

/*
  Template.hello.helpers({
    //allUsers(){ return Meteor.users.find({}); },
    email(){ return Meteor.user().emails[0].address; }
  });
  */

  Template.hello.helpers({
    email:function(){
      return;
    }
  });


}
