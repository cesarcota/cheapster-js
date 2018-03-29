import validateEmail from "../../imports/email-validation.js";

Template.register.events({
    "submit .add-user": function(event) {
        event.preventDefault();
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        var repeatPassword = event.target.repeatPassword.value;
        var displayName = event.target.registerDisplayName.value;
        var customTypes = ["Beer", "Coffee", "Meals", "Other"];

        //Convert the password to hashcode
        const hash = require("js-hash-code");
        passwordVar = hash(passwordVar);
        repeatPassword = hash(repeatPassword);

        //Validate the email
        if (validateEmail(emailVar) === false) {
            FlashMessages.sendError("Not a valid email");
            return;
        }

        //The user name can't have more than 12 characters
        if (displayName.length > 12) {
            FlashMessages.sendError(
                "Display Name can't have more than 12 chars"
            );
            return;
        }
        //Both passwords must be equal
        if (repeatPassword !== passwordVar) {
            FlashMessages.sendError("Passwords must be equal");
            return;
        }

        //The password must have at least 5 characters
        if (passwordVar.length < 5) {
            FlashMessages.sendError(
                "Passwords must have at least 5 characters"
            );
            return;
        }
        //Create the user
        var userData = {
            email: emailVar,
            password: passwordVar,
            displayName: displayName,
            customTypes: customTypes,
            groups: []
        };

        Meteor.call("addUser", userData);
        FlashMessages.sendSuccess("User created successfully");
        Router.go("/login");
        console.log("Form submitted.");
    }
});
