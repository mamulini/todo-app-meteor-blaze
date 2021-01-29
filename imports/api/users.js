import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


if (Meteor.isServer) {
  Meteor.publish('users', function usersPublication() {
    return Meteor.users.find({});
  });


}

Accounts.validateLoginAttempt((option) => {
  if (option.user.banned) {
    throw new Meteor.Error("account-banned", "Your account is banned");
  }
  return true;
});

Meteor.methods({
  'user.toggleBan'(id, isBanned) {
    check(id, String);
    check(isBanned, Boolean);

    Meteor.users.update(id, {
      $set: {
        banned: isBanned
      }
    });
  }
});