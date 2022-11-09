import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";

export default Component.extend({
  store: service(),

  allUsers: computed(function () {
    return this.get("store").findAll("user", { reload: true });
  }),

  myTeamMembers: computed("allUsers.isFulfilled", function () {
    if (this.allUsers.isFulfilled) {
      return this.allUsers.uniqBy("team");
    }
  }),

  actions: {
    isFilter: async function (user) {
      let getUser = await this.allUsers;
      let userList = getUser.filterBy("team", user);
      this.set("usersList", userList);
    },
  },
});
