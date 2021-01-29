import { Template } from 'meteor/templating'; // Template VirDOM like
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { ReactiveDict } from 'meteor/reactive-dict'; // like state in js object
import { Tasks } from '../../api/tasks'; // mongoDB collection

import '../components/task'; // view component
// import './usernames'; // view component
import './homePage.html'; // HTML markup

Template.homePage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('todoLimit', 2);
  Meteor.subscribe('tasks', this.state.get('todoLimit'));
});

Template.homePage.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }

    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
});

Template.homePage.events({
  'submit .new-task'(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;

    Meteor.call('tasks.insert', text);


    target.text.value = '';
  },

  'change .hide-completed input'(event, templateInstance) {
    templateInstance.state.set('hideCompleted', event.target.checked);
  },
  'click .load-todos'(event, templateInstance) {
    const limit = templateInstance.state.get('todoLimit');
    templateInstance.state.set('todoLimit', limit + 2);
    Meteor.subscribe('tasks', templateInstance.state.get('todoLimit'));
  },
  'click .load-users'() {
    FlowRouter.go('/users');
  }
});