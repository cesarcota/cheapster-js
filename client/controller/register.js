

Template.register.events({
    "submit .add-user": function(event) {
        event.preventDefault();
        var email = event.target.registerEmail.value;
        var password = event.target.registerPassword.value;
        var repeatPassword = event.target.repeatPassword.value;
        var username = event.target.registerDisplayName.value;
        var customTypes = ["Beer", "Coffee", "Meals", "Other"];

        var profile = {username, groups: [], customTypes};

        Accounts.createUser({email, password, repeatPassword, profile}, function(err, result) {
            console.log("arguments are", result);
            if(!err){
                FlashMessages.sendSuccess("User created successfully");
                Router.go("/login");
            }else{
                FlashMessages.sendError(err);
            }
            
        });

        /*
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
        */
    }
});
