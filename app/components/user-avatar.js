import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  store: service(),

  init() {
    this._super(...arguments);
    this.profileChar = this.user.firstName.charAt(0);
    this.avatar_colors = ['#AFCFFD', '#E1C8CE', '#ABCFE0', '#9FDEDA', '#FCC5B7', '#F1BBE7', '#E2C1DF', '#A2C7F6', '#D2CDE0', '#C7D9A8', '#95D1F3',
      '#BFC5EE', '#E8BBC1', '#DDC9B8', '#AFCFFD', '#ABCFE0', '#9FDEDA', '#FCC5B7', '#F1BBE7', '#E2C1DF', '#A2C7F6', '#D2CDE0',
      '#C7D9A8', '#95D1F3', '#BFC5EE', '#E8BBC1'];
  },


  getCharCode: function () {
    const charCodes = this.profileChar.charCodeAt();
    return charCodes
  },

  getBgColor: computed('avatar_colors', function () {
      return htmlSafe("background: " + this.avatar_colors[this.getCharCode() % this.avatar_colors.length]);

  }),
});
