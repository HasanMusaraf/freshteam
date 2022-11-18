import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  init() {
    this._super(...arguments);
    this.destination = 'Freshteam';
  },

  allUsers: computed(function () {
    return this.get('store').findAll('user', { reload: true });
  }),

  myTeamMembers: computed('allUsers.isFulfilled', function () {
    this.teamList = [];
    if (this.allUsers.isFulfilled) {
      this.allUsers.filterBy('isNew',false).rejectBy('team',null).uniqBy('team').forEach((element) => {
        this.teamList.push(element.team);
      });
    }
    return this.teamList;
  }),

  actions: {
    chooseDestination(selectedTeam) {
      this.set('destination', selectedTeam);
    },
  },
});
