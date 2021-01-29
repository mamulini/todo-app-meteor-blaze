import { Template } from 'meteor/templating'; // Template VirDOM like
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


import './userPage.html';

Template.userPage.onCreated(function userPageOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('usersLimit', 5);

});

Template.userPage.helpers({
  users() {
    const instance = Template.instance();
    const usersLimit = instance.state.get('usersLimit');

    Meteor.subscribe('users');
    // console.log(Meteor.users.find());
    return Meteor.users.find({}, { limit: usersLimit });
  },
  userEmail() {
    if (this.emails && this.emails.length > 0) {
      return this.emails[0].address;
    }
  },
  userCreateDate() {
    if (this.createdAt) {
      return this.createdAt.toISOString().substring(0, 10);
    }
  }
});

Template.userPage.events({
  'click .home-btn'() {
    FlowRouter.go('/');
  },
  'click .load-users'(event, templateInstance) {
    const limit = templateInstance.state.get('usersLimit');
    templateInstance.state.set('usersLimit', limit + 5);
  },
  'click .user-ban'() {
    Meteor.call('user.toggleBan', this._id, !this.banned);

  },
  // 'mouseover .user-ban'() {
  //   console.log(this);

  // }
});

