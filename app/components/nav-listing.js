import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";

export default Component.extend({
  router: service(),

  isUserRoute: computed("router.currentRouteName", function () {
    return this.router.currentRouteName === "users.index" || this.router.currentRouteName === "users.new";
  }),
});
