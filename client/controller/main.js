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
       Router.go('/register');
     }

     //Create the user
     Accounts.createUser({
       email: emailVar,
       password: passwordVar
     }, function(error) {
       if (error) {
         FlashMessages.sendError(error.reason);
         Router.go('/register');
       } else {
           Router.go('/');
           FlashMessages.sendError("User created successfully!")
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

     //Perform the login action with a Meteor collection
     Meteor.loginWithPassword(emailVar, passwordVar, function(error){
       if(error){
         FlashMessages.sendError(error.reason);
       }else{
         FlashMessages.sendError("Login success!");
         Router.go('/dashboard');
       }
     });

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
