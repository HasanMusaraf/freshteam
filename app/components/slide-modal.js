import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { get } from "@ember/object";

export default Component.extend({
  router: service(),
  store: service(),

  actions: {
    close: async function () {
      this.router.transitionTo("users");
      this.model.deleteRecord();
    },
    sendForm: function () {
      this.set('model.active', true);
      if (this.model.save()) {
        alert("User successfully Created");
        this.router.transitionTo("users");
      }

    },
  },
});
