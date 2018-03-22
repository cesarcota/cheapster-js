import { Meteor } from "meteor/meteor";

let list = [];
Template.eventsList.onCreated(function onCreated() {
    list = new ReactiveVar();
    Meteor.call("findEventsByGroup", this.data._id, function(error, events) {
        if (!error) {
            var tempList = [];
            //This method reverses the order of the array
            events.reverse();
            events.forEach(function(element, index) {
                if (index < 5) {
                    tempList.splice(0, 0, element);
                }
            });
            console.log("LIST TO RENDER: ", tempList);
            list.set(tempList);
        }
    });
});

Template.eventsList.helpers({
    showEvents() {
        console.log("LIST IN THE HELPERS: ", list.get());
        return list.get();
    }
});

Template.eventsList.events({
    "click .selectEvent": function(event) {
        var eventId = $(event.currentTarget).val();
        Router.go("/event-stats/" + eventId);
    }
});
