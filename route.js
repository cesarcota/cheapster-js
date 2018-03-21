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
    this.render("addgroup");
});

Router.route("/dashboard", function() {
    if (Session.get("sessionUser") !== undefined) {
        console.log("SESSION: " + Session.get("sessionUser").email);
        this.render("dashboard");
    } else {
        console.log("SESSION: " + Session.get("sessionUser"));
        this.render("login");
    }
});

Router.route("/group-status/:_id", function() {
    if (Session.get("sessionUser") === undefined) {
        this.render("/login");
    } else {
        Meteor.call(
            "findGroupById",
            this.params._id,
            function(error, result) {
                if (!error) {
                    this.render("group-status", {
                        data: function() {
                            return result;
                        }
                    });
                }
            }.bind(this)
        );
    }
});

Router.route("/group-status/:_id/event", function() {
    if (Session.get("sessionUser") === undefined) {
        this.render("/login");
    } else {
        Meteor.call(
            "findGroupById",
            this.params._id,
            function(error, result) {
                if (!error) {
                    this.render("eventBoard", {
                        data: function() {
                            return result;
                        }
                    });
                }
            }.bind(this)
        );
    }
});

Router.route("/group-status/:_id/add-friend", function() {
    if (Session.get("sessionUser") === undefined) {
        this.render("/login");
    } else {
        Meteor.call(
            "findGroupById",
            this.params._id,
            function(error, result) {
                if (!error) {
                    this.render("updateFriend", {
                        data: function() {
                            return result;
                        }
                    });
                }
            }.bind(this)
        );
    }
});

Router.route("/newgroup", function() {
    if (Session.get("sessionUser") !== undefined) {
        console.log("SESSION NEWGROUP: " + Session.get("sessionUser").email);
        this.render("newgroup");
    } else {
        console.log("SESSION NEWGROUP: " + Session.get("sessionUser"));
        this.render("login");
    }
});
