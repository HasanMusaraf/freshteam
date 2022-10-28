import Component from '@ember/component';
import computed from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
init() {
    this._super(...arguments);
    this.userCount();
    //console.log();
},


userCount: function(){
  this.getUser = this.get('store').findAll('user'); 
}

});
