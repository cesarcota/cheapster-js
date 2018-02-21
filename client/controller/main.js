if(Meteor.isClient){

 Template.register.events({
   "submit .add-user": function(event){
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
     Meteor.call("addUser", {email: emailVar, password: passwordVar});
     FlashMessages.sendSuccess("User created successfully");
     Router.go('/');

/*

     Accounts.createUser({
       email: emailVar,
       password: passwordVar,
       groups: ["coffee", "beer"]
     }, function(error) {
       if (error) {
         FlashMessages.sendError(error.reason);
         Router.go('/register');
       } else {
           Router.go('/');
           FlashMessages.sendError("User created successfully!")
       }
   });

   */

     console.log("Form submitted.");

 }


 });



 Template.login.events({
   "submit form": function(event){
     event.preventDefault();
     var emailVar = event.target.loginEmail.value;
     var passwordVar = event.target.loginPassword.value;

     //Authentication
     Meteor.call("findByEmail", emailVar, function(error, tempUser){
       if(error){
         FlashMessages.sendError("Not a valid email or password.");
         return;
       }else{
         //This means that it entered here to do the Authentication
         //Checks the password of the user
         if(tempUser.password !== passwordVar){
           FlashMessages.sendError("Not a valid email or password.");
           return;
         }
       }
     });


/*
     //Perform the login action with a Meteor collection
     Meteor.loginWithPassword(emailVar, passwordVar, function(error){
       if(error){
         FlashMessages.sendError(error.reason);
       }else{
         FlashMessages.sendError("Login success!");
         Router.go('/dashboard');
       }
     });

     */

     console.log("Form submitted.");
   }
 });

}
