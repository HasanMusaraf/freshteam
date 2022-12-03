import DS from "ember-data";
import { validator, buildValidations } from 'ember-cp-validations';


const Validations = buildValidations({
  firstName: [
      validator('presence', true),
      validator('length', {
          min: 2,
          max:128
        }),

      ],
  lastName: [
      validator('presence', true),
      validator('length', {
      min: 2,
      max:128
    })
  ],
  designation: [
      validator('length', {
      min: 2,
      max:128
    })
  ],

  email: [
    validator('presence', true),
    validator('format', { type: 'email' }),
     
  ],


});

export default DS.Model.extend(Validations,{
  firstName: DS.attr("string"),
  lastName: DS.attr("string"),
  email: DS.attr("string"),
  team: DS.attr("string"),
  joiningDate: DS.attr("string"),
  designation: DS.attr("string"),
  image: DS.attr("string"),
  active: DS.attr('boolean', {defaultValue: false})
});
