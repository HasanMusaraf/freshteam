import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { click } from 'ember-test-helpers';
import { set } from '@ember/object';


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
      name: "hasan",
      age: 20
    }

    set(this, 'onConfirm', function() {
      assert.ok('Save action invoked');
    });

    this.store = this.owner.lookup('service:store');
    this.model = this.store.createRecord('user', this.person);
      
    // Template block usage:
    await render(hbs`
    <SlideModal @router={{this.router}} @model={{this.model}}  @onConfirm={{this.onConfirm}}/>
    `);

    assert.dom('[data-test-id="slideModal"]').exists();
    assert.dom('[data-test-id="create-user-form"]').exists();
    await click('[data-test-id="slideModal-close-btn"]');
    assert.dom('[data-test-id="add-employee-text"]').hasText('Add Employee');
    assert.dom('[data-test-id="reset-text"]').hasText('Reset');
    await click('[data-test-id="create-user-form"]');
  });
});
