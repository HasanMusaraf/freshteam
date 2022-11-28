import Component from '@ember/component';
import { debounce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { computed, get, set } from '@ember/object';

export default Component.extend({
  store: service(),
  init(){
    this._super(...arguments);
    set(this,'sortName','firstName');
    set(this, 'selectedOrder', 'asc');
    set(this, 'selectedValue', 'firstName');

  },

  allUsers: computed(function () {
    this.getUser = get(this,'store').findAll('user', { reload: true });
    return this.getUser;
  }),

  userList: computed('getTeam','sortName','selectedOrder','allUsers.isFulfilled','searchValue', function () {
    if (this.allUsers.isFulfilled) {
      if(this.searchValue){
        if (this.selectedOrder == 'asc' ) {
          return  this.getTeam ? this.searchValue.filterBy('team', this.getTeam).sortBy(this.sortName) : this.searchValue.sortBy(this.sortName);
        } else {
          return  this.getTeam ? this.searchValue.filterBy('team', this.getTeam).sortBy(this.sortName).reverse() : this.searchValue.sortBy(this.sortName).reverse();
        }
    } else if (this.selectedOrder == 'desc' ) {
        return  this.getTeam ? this.allUsers.filterBy('team', this.getTeam).sortBy(this.sortName).reverse() : this.allUsers.sortBy(this.sortName).reverse();
    }  else {
      return  this.getTeam ? this.allUsers.filterBy('team', this.getTeam).sortBy(this.sortName) : this.allUsers.sortBy(this.sortName);
    }
  }

  }),

  myTeamMembers: computed('allUsers.isFulfilled', function () {
    if (this.allUsers.isFulfilled) {
      return this.allUsers.uniqBy('team');
    }
  }),



  sortArray: computed(function () {
    let sortList = [
      {
        name: 'firstName',
        displayName: 'First Name',
      },
      {
        name: 'lastName',
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



  actions: {
    filterby: function () {
      this.toggleProperty('clicked');
    },

    sortby: function () {
      this.toggleProperty('sortByclicked');
    },

    isFilter: async function (team) {
      set(this,'getTeam', team);
      set(this, 'currentTeam', team);
    },

    sortFunc: function (sortName) {
        set(this, 'sortName', sortName);
        set(this, 'selectedValue', sortName);

    },

    sortOrder: function (order) {
       set(this, 'selectedOrder', order);
    },

    fname: function (term) {
      debounce(this, this.whoRan, term, 150);
    },
  },


  whoRan: function (term) {
    const getInput = this.allUsers;
    const regex = new RegExp(term.toLowerCase());
    const getSearch = getInput.filter(function (person) {
      return regex.test(person.firstName.toLowerCase());
    });
    set(this,'searchValue', getSearch);
  },
});
