

Meteor.publish("groupsList", function() {
    return Groups.find({});
});

Meteor.publish("eventsList", function() {
    return Events.find({});
});
