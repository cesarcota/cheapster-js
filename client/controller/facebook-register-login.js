/**
 * This module is for the login with facebook button
 * If user is not register, the user is register and then automatically logged in
 * If user is already register, does only the login
 */

Template.facebookButton.events({
    "click .facebookLogin": function() {
        FB.login(function(faceStatus) {
            if (faceStatus.authResponse) {
                FB.api("/me", { fields: "name, email" }, function(response) {
                    if (response.email === undefined) {
                        return;
                    }

                    Meteor.call("findByEmail", response.email, function(
                        error,
                        user
                    ) {
                        if (!error) {
                            //This gives a random password to the user
                            const hash = require("js-hash-code");
                            var password = hash(response.name);
                            var customTypes = [
                                "Beer",
                                "Coffee",
                                "Meals",
                                "Other"
                            ];

                            if (user === undefined) {
                                var newUser = {
                                    email: response.email,
                                    password: password,
                                    displayName: response.name.split(" ")[0],
                                    customTypes: customTypes,
                                    groups: []
                                };

                                Meteor.call("addUser", newUser);

                                Meteor.call(
                                    "findByEmail",
                                    newUser.email,
                                    function(error, userWithId) {
                                        if (!error) {
                                            Session.set(
                                                "sessionUser",
                                                userWithId
                                            );
                                            document.cookie = userWithId.email;
                                            Router.go("/dashboard");
                                        }
                                    }
                                );
                            } else {
                                Session.set("sessionUser", user);
                                document.cookie = user.email;
                                Router.go("/dashboard");
                            }
                        }
                    });
                });
            }
        });
    }
});

Template.facebookButton.rendered = function() {
    window.fbAsyncInit = function() {
        FB.init({
            appId: "575816526107182",
            cookie: true,
            xfbml: true,
            version: "v2.12"
        });

        FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
};
