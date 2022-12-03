import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  router: service(),
  store: service(),

  actions: {
    close: async function () {
      this.router.transitionTo("users");
      this.model.deleteRecord();
    },

    save: function(){
      this.set('model.active', true);
      let user = this.get('model');
       user.validate().then(

        ({ validations }) => {
          if (validations.get('isValid')) {
            user.save();
          } else {
            this.set('hasValidationFailed',true)
          }
        })
    }

  },
});
