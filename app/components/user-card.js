import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set } from '@ember/object'

export default Component.extend({
  store: service(),

  actions: {
    deleteEmployee() {
      this.toggleProperty('deleteConfirmation');
    },

    submit(userId) {
      let getUser = this.get('store').peekRecord('user', userId);
      getUser.deleteRecord();
      if (getUser.isDeleted) {
        getUser.save();
        set(this,'deleteConfirmation',false);
       }
    },
  },
});
