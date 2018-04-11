import { Meteor } from "meteor/meteor";
import hash from "js-hash-code";
import validateEmail from "../../imports/email-validation.js";

Accounts.onCreateUser((options,user) => {
    console.log("OPIONS: ",options);
    console.log("USER: ",user);

    console.log("PASS: ",options.password);

    //Validate the email
    if (validateEmail(options.email) === false) {
        return "Not a valid email";
    }

    //The user name can't have more than 12 characters
    if (options.profile.username.length > 12) {
        return "Display Name can't have more than 12 chars";
    }
    //Both passwords must be equal
    if (options.repeatPassword !== options.password) {
        return "Passwords must be equal";
    }

    //The password must have at least 5 characters
    if (options.password.length < 5) {
        return "Passwords must have at least 5 characters";
    }
    
    return user;
})

Meteor.methods({
    addUser: function(userData) {
        var userID = Users.insert(userData);
        return userID;
    },

    authenticate: function(email, password) {
        var user = Users.findOne({ email });

        console.log("user is", user);

        return user.password === hash(password);
    },

    findByEmail: function(emailVar) {
        var user = Users.findOne({ email: emailVar });
        return user? {email: user.email} : null;
    },

    findGroups: function() {
        console.log("finding groups for..", Meteor.userId());
        if (!Meteor.userId()) {
            return null;
        }
        
        var user = Users.findOne({_id: Meteor.userId()});
        console.log("user is", user);
        return user;
    },

    updateUser: function(userId, categories) {
        Users.update({ _id: userId }, { $set: { customTypes: categories } });
    }
});
