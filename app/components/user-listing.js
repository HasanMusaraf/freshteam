import Component from '@ember/component';
import { inject as service } from '@ember/service';
//import { filterBy } from '@ember/object/computed';
//import { get } from '@ember/object'; 
//import { computed } from '@ember/object';


export default Component.extend({
    store: service(),
    init() {
        this._super(...arguments);
        this.getUser = this.get('store').findAll('user'); 
    },
    
});
