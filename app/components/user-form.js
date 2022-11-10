import Component from '@ember/component';

export default Component.extend({
  actions: {
    changeDateAction: function(d) {
      // do sth with the new date
      console.log(d.getDate());
    },
  }
});
