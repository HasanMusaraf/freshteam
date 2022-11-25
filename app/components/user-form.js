import Component from '@ember/component';
import { computed, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  init() {
    this._super(...arguments);
  },

  allUsers: computed(function () {
    return this.get('store').findAll('user', { reload: true });
  }),

  myTeamMembers: computed('allUsers.isFulfilled', function () {
    this.teamList = [];
    if (this.allUsers.isFulfilled) {
      this.allUsers.filterBy('active',true).rejectBy('team',null).uniqBy('team').forEach((element) => {
        this.teamList.push(element.team);
      });
    }
    return this.teamList;
  }),

  actions: {
    chooseDestination(selectedTeam) {
      set(this,'model.team', selectedTeam);
    },
  },
});
