import { Meteor } from "meteor/meteor";

let addFriend;

Template.addFriend.onCreated(function onRender() {
    addFriend = new ReactiveVar([]);
});

//Template to show the list in a table
Template.addFriend.helpers({
    showFriends() {
        return addFriend.get();
    }
});

//Template to add a friend to the list that will be displayed in the table
Template.addFriend.events({
    "click .addFriend": function(event) {
        var friendEmail = document.getElementById("friendEmail").value;

        //To update the the list
        var tempList = addFriend.get();
        tempList.push(friendEmail);
        addFriend.set(tempList);
        document.getElementById("friendEmail").value = "";
    },

    "click .deleteFriend": function(event) {
        var friendEmail = event.target.id;

        //Now we need to delete the choosen email from the list of the given emails.
        var tempList = addFriend.get();
        tempList.forEach(function(email, index) {
            if (email === friendEmail) {
                tempList.splice(index, 1);
                addFriend.set(tempList);
            }
        });
    }
});

var getAddFriend = function() {
    if (addFriend.get() === undefined) {
        return undefined;
    }
    return addFriend.get();
};

export default getAddFriend;
