import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  router: service(),
  actions: {
    add_emp: function () {
      if( this.router.currentRouteName !== 'users/new') {
        this.router.transitionTo('/users/new')
    }
  }
  },
});
