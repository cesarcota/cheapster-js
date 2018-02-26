if(Meteor.isClient){

  Template.dashboard.events({
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

  
  Template.hello.helpers({
    email(){ return Session.get("sessionUser").email; }
  });



  Template.hello.helpers({
    email:function(){
      return;
    }
  });
}
