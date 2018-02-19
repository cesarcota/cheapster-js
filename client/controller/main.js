

if(Meteor.isClient){

  Template.register.events({
    "submit form": function(event){
      event.preventDefault();
      var emailVar = event.target.registerEmail.value;
      var passwordVar = event.target.registerPassword.value;

      //Can't have empty fields
      if(!emailVar || !passwordVar){
        FlashMessages.sendError("All fields must be filled.");
        throw new Meteor.Error("All fields must be filled.");
      }

      //Verify if the user already exists
      if (Meteor.users.find(emailVar)) {
        FlashMessages.sendError("A user with email " + emailVar + " already exists!");
        throw new Meteor.Error("A user with email " + emailVar + " already exists!");
      }

      //Create the user
      Accounts.createUser({
        email: emailVar,
        password: passwordVar
      });

      console.log("Form submitted.");
    }

  });



  Template.login.events({
    "submit form": function(event){
      event.preventDefault();
      var emailVar = event.target.loginEmail.value;
      var passwordVar = event.target.loginPassword.value;

      //Can't have empty fields
      if(!emailVar || !passwordVar){
        FlashMessages.sendError("All fields must be filled.");
        throw new Meteor.Error("All fields must be filled.");
      }
      
      //Perform the login action with a Meteor collection
      Meteor.loginWithPassword(emailVar, passwordVar);

      console.log("Form submitted.");
    }
  });
/*

  Template.dashboard.events({
    "click .logout": function (event){
      event.preventDefault();
      Meteor.logout();
    }
  });

*/
}
