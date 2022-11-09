import Component from "@ember/component";

export default Component.extend({
  actions: {
    touchEnd: function () {
      this.toggleProperty("isShowingBody");
      this.toggleProperty("clicked");
    },
  },
});
