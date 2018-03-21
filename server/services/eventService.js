import { Meteor } from "meteor/meteor";

Meteor.methods({
    addEvent: function(eventData) {
        var eventID = Events.insert(eventData);
        return eventID;
    },

    findEventsByGroup: function(groupId) {
        return Events.find({ groupId: groupId }).fetch();
    }
});
