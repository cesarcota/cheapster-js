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


  Template.hello.helpers({
    displayName(){ return Session.get("sessionUser").displayName; }
  });

  Template.listgroups.helpers({
    //allGroups(){return Session.get("sessionUser").groups},
    group(){
      /*
      var groups = Session.get("sessionUser").groups;
      */
      return _.map(groups, function(value, index){
        return {value: value, index: index};
      });
    }
  });


}
