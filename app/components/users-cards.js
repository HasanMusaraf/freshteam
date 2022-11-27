import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, get, set } from '@ember/object';

export default Component.extend({
  store: service(),

  allUsers: computed(function () {
    return get(this,'store').findAll('user', { reload: true });
  }),

  userList: computed('getTeam', function () {
    if (this.getTeam) {
      return this.allUsers.filterBy('team', this.getTeam);
    } else {
      return get(this,'store').findAll('user', { reload: true });
    }
  }),

  myTeamMembers: computed('allUsers.isFulfilled', function () {
    if (this.allUsers.isFulfilled) {
      return this.allUsers.uniqBy('team');
    }
  }),

  actions: {
    touchEnd: function () {
      this.toggleProperty('isShowingBody');
      this.toggleProperty('clicked');
    },

    isFilter: async function (team) {
      set(this,'getTeam', team);
    },
  },
});
