Template.header.events({
    "click .logout": function(event) {
        event.preventDefault();
        //To log out
        Session.set("sessionUser", undefined);
        Router.go("/login");
    },

    "click .goDashboard": function(event) {
        event.preventDefault();
        //To go to the dashboard
        Router.go("/dashboard");
    }
});

Template.hello.helpers({
    displayName() {
        return Session.get("sessionUser").displayName;
    }
});
