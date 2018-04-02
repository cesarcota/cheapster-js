Template.hello.helpers({
    displayName() {
        return Session.get("sessionUser").displayName;
    }
});
