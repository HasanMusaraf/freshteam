import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { fillIn } from 'ember-test-helpers';


module('Integration | Component | user-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });


    // Template block usage:
    await render(hbs`
      <UserForm />
    `);

    assert.dom('[data-test-id="add-employee-fields"]').exists();
    assert.dom('[ data-test-id="firstName"]').exists();

    //await fillIn('[ data-test-id="firstName"]','hello world')
  });
});
