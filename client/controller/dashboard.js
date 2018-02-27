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

    Template.listgroups.events({
      "click .select-group": function (event){
        event.preventDefault();
        var groupId = $(event.currentTarget).val();
        Meteor.call("findGroupById", groupId,function(error,group){
          if(!error){
            ///console.log("GROUP NAME: ", group.groupName);
            //Stores this group in a session variable so it can be used in the next view
            Session.set("sessionGroup", group);
          }
        })
      }
    });

  //The next 2 templates are used to show the uses in each group, together with the name of
  //the group
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
