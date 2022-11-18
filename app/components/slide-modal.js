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
      get(this, "onConfirm") && get(this, "onConfirm")();
    },
  },
});
