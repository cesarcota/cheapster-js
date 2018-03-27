Template.header.events({
    "click .logout": function(event) {
        event.preventDefault();
        //To log out
        Session.set("sessionUser", undefined);
        Router.go("/login");
    }
});
