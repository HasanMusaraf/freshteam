import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  team: DS.attr('string'),
  joiningDate: DS.attr('string'),
  image: DS.attr('string')
});
