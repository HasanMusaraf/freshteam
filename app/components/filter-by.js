import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  init() {
      this._super(...arguments);
  },
  
  actions: {
    isFilter: async function(user){
      let getUser1 = await this.get('store').findAll('user'); 
       let car = (getUser1.filterBy('team', user));
      console.log(car[0].email);
    }
  }


});
