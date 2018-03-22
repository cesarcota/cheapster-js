import { Meteor } from "meteor/meteor";

Meteor.methods({
    addEvent: function(eventData) {
        var eventID = Events.insert(eventData);
        return eventID;
    },

    findEventsByGroup: function(groupId) {
        return Events.find({ groupId: groupId }).fetch();
    },

    findEventById: function(eventId) {
        var event = Events.findOne({ _id: eventId });
        return event;
    }
});
