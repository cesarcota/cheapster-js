if(Meteor.isClient){

 Template.register.events({
   "submit form": function(event){
     event.preventDefault();
     var emailVar = event.target.registerEmail.value;
     var passwordVar = event.target.registerPassword.value;
     var repeatPassword = event.target.repeatPassword.value;

     //Both passwords must be equal
     if(repeatPassword !== passwordVar){
       FlashMessages.sendError("Passwords must be equal");
       throw new Meteor.Error("Passwords must be equal");
     }

     //Create the user
     Accounts.createUser({
       email: emailVar,
       password: passwordVar
     }, function(error) {
       if (error) {
         FlashMessages.sendError(error.reason);
         throw new Meteor.Error(error.reason)
       } else {
           Router.go('/');
       }
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
