import Component from '@ember/component';
// import { set } from '@ember/object';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
    router: service(),

    activeIcon: false,

    isUserRoute: computed('router.currentRouteName', function () {
        return this.router.currentRouteName === 'users';
    }),
});
