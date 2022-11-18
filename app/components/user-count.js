import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  store: service(),

userLists: computed('getAllUsers.isFulfilled', function (){
  if (this.getAllUsers.isFulfilled) {
      return this.getAllUsers.sortBy('first_name').filterBy('isNew', false);
  }

}),

getAllUsers: computed(function(){
  let getUser = this.get('store').findAll('user',{reload: true}); 
  return getUser;
})


});
