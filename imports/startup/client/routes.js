import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import '../../ui/pages/homePage.js';
import '../../ui/pages/userPage.js';
import '../../ui/appBody.js';

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    this.render('appBody', { main: 'homePage' });
  }
});

FlowRouter.route('/users', {
  name: 'App.users',
  action() {
    this.render('appBody', { main: 'userPage' });
  }
});
