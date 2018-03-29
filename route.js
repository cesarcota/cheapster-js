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
    if (document.cookie === undefined || document.cookie === "") {
        this.render("login");
    } else {
        this.render("addgroup");
    }
});

Router.route("/dashboard", function() {
    if (document.cookie !== undefined || document.cookie !== "") {
        setSession(document.cookie, this, "dashboard");
    } else {
        this.render("login");
    }
});

Router.route("/group-status/:_id", function() {
    if (document.cookie === undefined || document.cookie === "") {
        this.render("/login");
    } else {
        Meteor.call(
            "findGroupById",
            this.params._id,
            function(error, result) {
                if (!error) {
                    setSession(document.cookie, this, "group-status", result);
                }
            }.bind(this)
        );
    }
});

Router.route("/group-status/:_id/event", function() {
    if (document.cookie === undefined || document.cookie === "") {
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
    if (document.cookie === undefined || document.cookie === "") {
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
    if (document.cookie !== undefined || document.cookie !== "") {
        setSession(document.cookie, this, "newgroup");
    } else {
        this.render("login");
    }
});

function setSession(email, page, template, idStore) {
    //This code is for when the cookies increment a new user
    var refactorEmail = email.split("; ");

    refactorEmail = refactorEmail[0];
    Meteor.call("findByEmail", refactorEmail, function(error, user) {
        if (!error) {
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
