import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { fillIn } from 'ember-test-helpers';
import { set } from '@ember/object';


module('Integration | Component | user-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.person = {
    }
    this.store = this.owner.lookup('service:store');
    this.model = this.store.createRecord('user',this.person);
    set(this,'user',this.model)


    // Template block usage:
    await render(hbs`
      <UserForm  @model={{this.model}}/>
    `);

    assert.dom('[data-test-id="add-employee-fields"]').exists();
    assert.dom('[ data-test-id="firstName"]').exists();

    await fillIn('[ data-test-id="firstName"] input','shalini');
    await fillIn('[ data-test-id="lastName"] input','sivakumar');
    await fillIn('[ data-test-id="email"] input','shalini@gmail.com');
    await fillIn('[ data-test-id="designation"] input','Frontend');

  });
});
