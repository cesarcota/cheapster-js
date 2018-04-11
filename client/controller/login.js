Template.login.events({
    "submit form": function(event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;

        //Convert the password to hashcode
        const hash = require("js-hash-code");
        passwordVar = hash(passwordVar);

        //Authentication
        Meteor.call("findByEmail", emailVar, function(error, tempUser) {
            if (error) {
                FlashMessages.sendError("Not a valid email or password.");
                return;
            } else {
                if (tempUser !== undefined) {
                    //This means that it entered here to do the Authentication
                    //Checks the password of the user
                    if (tempUser.password !== passwordVar) {
                        FlashMessages.sendError(
                            "Not a valid email or password."
                        );
                        return;
                    } else {
                        Session.set("sessionUser", tempUser);
                        //Store the user in a cookie
                        document.cookie = tempUser.email;
                        //document.cookie =
                        name +
                            "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=[username=luis@hotmail.com];";

                        //document.cookie = undefined;
                        Router.go("/dashboard");
                    }
                } else {
                    FlashMessages.sendError("Not a valid email or password.");
                    return;
                }
            }
        });
    }
});