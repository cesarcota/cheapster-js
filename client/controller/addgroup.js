if(Meteor.isClient){

  Template.newgroup.events({

    "submit .addGroup": function(event){
      event.preventDefault();
      var groupName = event.target.groupName.value;
      //if there is a new group type, add it to the group
      if(Session.get("newType") === true){
    
        var newCustomType = event.target.newType.value;

        var typeArray = Session.get("sessionUser").customTypes;
        console.log("TYPE ARRAY"+typeArray);
        typeArray.push(newCustomType);
        console.log("ARRAY: "+typeArray);
      }




  }


});

Template.categories.helpers({
    categories: function(){
      Session.set("newType",false);
        return Session.get("sessionUser").customTypes;
    }
});

Template.categories.events({
    "change #category-select": function (event, template) {
        var category = $(event.currentTarget).val();

        if(category === "Other"){

          Session.set("newType", true);

        }else{
          Session.set("newType", false);
        }
    }
});

Template.newgroup.helpers({
  addNewType(){

    if (Session.get("newType") === true){
      //This is to show the space to create a new group type
      return Session.get("newType");
    }
  }
});

//Template to add new categories to the user memory, that he adds
Template.otherGroupOption.events({
/*
  "submit .add-custom-type": function(event){
    event.preventDefault();
    var newCustomType = event.target.newType.value;
    Session.set("typeToAdd", newCustomType);
    console.log("NEW TYPE IN SESSION: "+newCustomType);
    //Session.get("sessionUser").customTypes.push(newCustomType);
    //console.log("ARRAY: "+Session.get("sessionUser").customTypes);

}
*/

});


}
