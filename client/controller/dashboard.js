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
    displayName(){ return Session.get("sessionUser").displayName; }
  });

  Template.listgroups.helpers({

    //allGroups(){return Session.get("sessionUser").groups},
    groupList(){
      var map = Groups.find({users: Session.get("sessionUser")}).fetch();

      return Groups.find({users: Session.get("sessionUser")}).fetch();

    }

  });

  Template.listusers.rendered = function(){
    Meteor.call("listUsers", Session.get("sessionUser"), function(error,result){
        if(!error){
          Session.set("listAllUsers", result);
        }
      });
  }

  Template.listusers.helpers({
    showUsers(){
      return Session.get("listAllUsers");
    }

  });


}
