import Component from '@ember/component';
import { inject as service } from '@ember/service';


export default Component.extend({
  store: service(),

  init() {
    this._super(...arguments);
    this.profile_char = this.user.first_name.charAt(0);
  },

});
