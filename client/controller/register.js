Template.register.events({
  "submit .add-user": function(event){
    event.preventDefault();
    var emailVar = event.target.registerEmail.value;
    var passwordVar = event.target.registerPassword.value;
    var repeatPassword = event.target.repeatPassword.value;
    var displayName = event.target.registerDisplayName.value;
    var customTypes=["Beer", "Coffee", "Meals","Other"];
    //Both passwords must be equal
    if(repeatPassword !== passwordVar){
      FlashMessages.sendError("Passwords must be equal");
      return;
    }

    //The password must have at least 5 characters
    if(passwordVar.length<5){
      FlashMessages.sendError("Passwords must have at least 5 characters");
      return;
    }
    //Create the user
    Meteor.call("addUser", {email: emailVar, password: passwordVar, displayName: displayName, customTypes: customTypes});
    FlashMessages.sendSuccess("User created successfully");
    Router.go('/login');
    console.log("Form submitted.");
}
});
