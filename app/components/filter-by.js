import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import { debounce } from "@ember/runloop";

export default Component.extend({
  store: service(),

  init() {
    this._super(...arguments);
    this.set("selectedOrder", "asc");
    this.sortOrder = true;
    this.set("selectedValue", "first_name");
  },

  allUsers: computed(function () {
    return this.get("store").findAll("user", { reload: true });
  }),

  myTeamMembers: computed("allUsers.isFulfilled", function () {
    return this.allUsers.uniqBy("team");
  }),

  actions: {
    isFilter: async function (user) {
      this.set("currentTeam", user);
      let getUser = await this.get("store").findAll("user");
      let userList = getUser.filterBy("team", user);
      this.set("usersList", userList.sortBy("first_name"));
    },
    sortFunc: function (sortName, sortDisplay) {
      this.set("selectedValue", sortName);
      this.set("sortDisplay", sortDisplay);
      if (this.sortOrder) {
        this.set("usersList", this.usersList.sortBy(sortName));
      } else {
        this.set("usersList", this.usersList.sortBy(sortName)).reverse();
      }
    },

    filterby: function () {
      this.toggleProperty("clicked");
    },

    sortby: function () {
      this.toggleProperty("sortByclicked");
    },

    sortOrder: function (order) {
      this.set("selectedOrder", order);
      if (order == "asc") {
        this.set("sortOrder", true);
        this.set("selectedValue", "");
      }

      if (order == "desc") {
        this.set("sortOrder", false);
        this.set("selectedValue", "");
      }
    },
    fname: function (term) {
      debounce(this, this.whoRan, term, 150);
    },
  },

  whoRan: function (term) {
    let getInput = this.store.peekAll("user");

    var regex = new RegExp(term.toLowerCase());

    let getSearch = getInput.filter(function (person) {
      return regex.test(person.first_name.toLowerCase());
    });

    this.set("usersList", getSearch);
  },

  sortArray: computed(function () {
    let sortList = [
      {
        name: "first_name",
        displayName: "First Name",
      },
      {
        name: "last_name",
        displayName: "Last Name",
      },
      {
        name: "joiningDate",
        displayName: "Joining Date",
      },
    ];

    return sortList;
  }),

  sortOrderArray: computed(function () {
    let sortOrderList = [
      {
        orderParam: "asc",
        sortOrder: "Ascending",
      },
      {
        orderParam: "desc",
        sortOrder: "Descending",
      },
    ];

    return sortOrderList;
  }),
});
