import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
init() {
    this._super(...arguments);
    this.userCount();
},


userCount: async function(){
  this.getUser = await this.get('store').findAll('user'); 
  this.set('getUser',this.getUser.sortBy('first_name'));
}

});
