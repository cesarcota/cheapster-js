Router.route("/", function() {
    this.render("landingpage");
});

Router.route("/login", function() {
    this.render("login");
});

Router.route("/register", function() {
    this.render("register");
});

Router.route("/addgroup", function() {
    if (document.cookie === undefined) {
        this.render("login");
    } else {
        this.render("addgroup");
    }
});

Router.route("/dashboard", function() {
    console.log("COOKIE: ", document.cookie);
    if (document.cookie !== undefined) {
        setSession(document.cookie, this, "dashboard");
    } else {
        this.render("login");
    }
});

Router.route("/group-status/:_id", function() {
    if (document.cookie === undefined) {
        this.render("/login");
    } else {
        Meteor.call(
            "findGroupById",
            this.params._id,
            function(error, result) {
                if (!error) {
                    console.log("COOKIE: ", document.cookie);
                    console.log("RESULT: ", result);
                    setSession(document.cookie, this, "group-status", result);
                }
            }.bind(this)
        );
    }
});

Router.route("/group-status/:_id/event", function() {
    if (document.cookie === undefined) {
        this.render("/login");
    } else {
        Meteor.call(
            "findGroupById",
            this.params._id,
            function(error, result) {
                if (!error) {
                    setSession(document.cookie, this, "eventBoard", result);
                }
            }.bind(this)
        );
    }
});

Router.route("/group-status/:_id/add-friend", function() {
    if (document.cookie === undefined) {
        this.render("/login");
    } else {
        Meteor.call(
            "findGroupById",
            this.params._id,
            function(error, result) {
                if (!error) {
                    setSession(document.cookie, this, "updateFriend", result);
                }
            }.bind(this)
        );
    }
});

Router.route("/newgroup", function() {
    if (document.cookie !== undefined) {
        setSession(document.cookie, this, "newgroup");
    } else {
        this.render("login");
    }
});

function setSession(email, page, template, idStore) {
    //This code is for when the cookies increment a new user
    var refactorEmail = email.split("; ");

    refactorEmail = refactorEmail[0];

    console.log("REFACTOR EMAIL: ", refactorEmail);
    Meteor.call("findByEmail", refactorEmail, function(error, user) {
        if (!error) {
            console.log("USER IN FUNCTION: ", user);
            Session.set("sessionUser", user);
            if (idStore !== undefined) {
                page.render(template, {
                    data: function() {
                        return idStore;
                    }
                });
            } else {
                page.render(template);
            }
        }
    });
}
