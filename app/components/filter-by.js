import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { set } from '@ember/object';

export default Component.extend({
  store: service(),

  init() {
    this._super(...arguments);
    set(this, 'selectedOrder', 'asc');
    this.sortOrder = true;
    set(this, 'selectedValue', 'first_name');
  },

  allUsers: computed(function () {
    return this.get('store').findAll('user', { reload: true });
  }),

  myTeamMembers: computed('allUsers.isFulfilled', function () {
    return this.allUsers.uniqBy('team');
  }),

  actions: {
    isFilter: async function (user) {
      set(this, 'currentTeam', user);
      let getUser = await this.get('store').findAll('user');
      let userList = getUser.filterBy('team', user);
      set(this, 'usersList', userList.sortBy('first_name'));
    },
    sortFunc: function (sortName, sortDisplay) {
      set(this, 'selectedValue', sortName);
      set(this, 'sortDisplay', sortDisplay);
      if (this.sortOrder) {
        set(this, 'usersList', this.usersList.sortBy(sortName));
      } else {
        set(this, 'usersList', this.usersList.sortBy(sortName)).reverse();
      }
    },

    filterby: function () {
      this.toggleProperty('clicked');
    },

    sortby: function () {
      this.toggleProperty('sortByclicked');
    },

    sortOrder: function (order) {
      set(this, 'selectedOrder', order);
      if (order == 'asc') {
        set(this, 'usersList', this.usersList.sortBy(this.selectedValue));
        set(this, 'sortOrder', true);
      }

      if (order == 'desc') {
        set(this, 'usersList', this.usersList.sortBy(this.selectedValue)).reverse();
        set(this, 'sortOrder', false);
      }
    },
  },

  sortArray: computed(function () {
    let sortList = [
      {
        name: 'first_name',
        displayName: 'First Name',
      },
      {
        name: 'last_name',
        displayName: 'Last Name',
      },
      {
        name: 'joiningDate',
        displayName: 'Joining Date',
      },
    ];

    return sortList;
  }),

  sortOrderArray: computed(function () {
    let sortOrderList = [
      {
        orderParam: 'asc',
        sortOrder: 'Ascending',
      },
      {
        orderParam: 'desc',
        sortOrder: 'Descending',
      },
    ];

    return sortOrderList;
  }),
});
