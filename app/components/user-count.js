import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),

  userLists: computed('getAllUsers.isFulfilled', function (){
    if (this.getAllUsers.isFulfilled) {
      return this.getAllUsers.sortBy('firstName').filterBy('active', true).rejectBy('firstName',null);
    }
  }),

  getAllUsers: computed(function(){
    return this.get('store').findAll('user',{reload: true}); 
  })
});