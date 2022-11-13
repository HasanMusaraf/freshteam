import Component from '@ember/component';

export default Component.extend({
init(){
  this._super(...arguments);
  this.cities = ['FreshTeam', 'FreshSales', 'FreshChat', 'FreshBot'];
  this.destination = 'London'

},

  actions: {
    changeDateAction: function(d) {
      // do sth with the new date
      console.log(d.getDate());
    },
    chooseDestination(city) {
      this.set('destination', city);
    }
  }

  
});
