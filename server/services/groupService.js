import { Meteor } from "meteor/meteor";

Meteor.methods({
    addGroup: function(groupData) {
        var groupId = Groups.insert(groupData);
        return groupId;
    },

    findGroupsByUser: function(userId) {
        var groups = Groups.find({ "users._id": userId }).fetch();
        return groups;
    },

    findGroupById: function(groupId) {
        var group = Groups.findOne({ _id: groupId });
        return group;
    },

    listUsers: function(userId) {
        var groups = Groups.find({ "users._id": userId }).fetch();
        return groups;
    },

    updateGroupUsers: function(groupId, users, rounds) {
        Groups.update(
            { _id: groupId },
            { $set: { users: users, rounds: rounds } }
        );
    },

    addFriend: function(groupId, friends) {
        Groups.update({ _id: groupId }, { $set: { users: friends } });
    }
});
