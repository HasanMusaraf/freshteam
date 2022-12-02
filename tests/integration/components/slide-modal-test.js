import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { click } from 'ember-test-helpers';
import { set } from '@ember/object';
import { fillIn } from 'ember-test-helpers';


module('Integration | Component | slide-modal', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.router = {
      transitionTo(path) {
        assert.equal(path, 'users');
      }
    }
 
    this.person = {
      firstName: 'xxx',
      team: 'Freshteam'
      }

    //set(this, 'onConfirm', function() {
    //  assert.ok('Save action invoked');
    //});

    this.store = this.owner.lookup('service:store');
    this.model = this.store.createRecord('user', this.person);
    set(this,'user',this.model)
      
    this.set('myDate', null);


    // Template block usage:
    await render(hbs`
    <SlideModal @router={{this.router}} @model={{this.model}}  >
      <UserForm  @model={{this.model}}  />
    </SlideModal>
    {{bootstrap-datepicker value=myDate changeDate="myAction"}}
    `);

    assert.dom('[data-test-id="slideModal"]').exists();
    assert.dom('[data-test-id="create-user-form"]').exists();
    //await click('[data-test-id="slideModal-close-btn"]');
    assert.dom('[data-test-id="add-employee-text"]').hasText('Add Employee');
    assert.dom('[data-test-id="reset-text"]').hasText('Reset');
    //await click('[data-test-id="create-user-form"]');

    assert.dom('[data-test-id="add-employee-fields"]').exists();
    assert.dom('[ data-test-id="firstName"]').exists();
    assert.dom('[ data-test-id="dob"] input').exists();


    await fillIn('[ data-test-id="firstName"] input', 'shalini');
    await fillIn('[ data-test-id="lastName"] input','sivakumar');
    await fillIn('[ data-test-id="email"] input','shalini@gmail.com');
    await fillIn('[ data-test-id="designation"] input','Frontend');
    await click('[ data-test-id="dob"] input');
    await fillIn('[ data-test-id="dob"] input','2022-12-04');


    //await click('.ember-power-select-trigger');
    //assert.dom('.ember-power-select-dropdown').exists();
    //await click('.ember-power-select-options');
    //assert.dom('.ember-power-select-option').exists();


    
  
  
  });
});
