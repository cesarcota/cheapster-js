Template.login.events({
    "submit form": function (event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;

        Meteor.loginWithPassword(emailVar,passwordVar,function(error){
            if(!error){
                FlashMessages.sendSuccess("Loggin success!");
                console.log("USER: ",Meteor.user());

            }
        });
/*

        Meteor.call("authenticate",emailVar, passwordVar, function (err, success) {

            console.log("called auth.. got", arguments)
            if (!success) {
                FlashMessages.sendError("Not a valid email or password.");
                return;
            }

            Session.set("sessionUser", tempUser);
            //Store the user in a cookie
            document.cookie = tempUser.email;
            //document.cookie =
            name +
                "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=[username=luis@hotmail.com];";

            //document.cookie = undefined;
            Router.go("/dashboard");
            



        });
        */
    }
});
