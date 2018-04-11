import { Meteor } from "meteor/meteor";

Meteor.methods({
    addUser: function(userData) {
        var userID = Users.insert(userData);
        return userID;
    },

    findByEmail: function(emailVar) {
        var user = Users.findOne({ email: emailVar });
        return user;
    },

    findGroups: function(user) {
        var groups = Users.findOne({ groups });
        return groups;
    },

    updateUser: function(userId, categories) {
        Users.update({ _id: userId }, { $set: { customTypes: categories } });
    },

    verification:function(userData){
        //Validate the email
        if (validateEmail(userData.email) === false) {
            return "Not a valid email";
        }

        //The user name can't have more than 12 characters
        if (userData.username.length > 12) {
            return "Display Name can't have more than 12 chars";
        }
        //Both passwords must be equal
        if (userData.repeatPassword !== userData.password) {
            return "Passwords must be equal";
        }

        //The password must have at least 5 characters
        if (userData.password.length < 5) {
            return "Passwords must have at least 5 characters";
        }

        return true;
    }
});
