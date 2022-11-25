import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { click } from 'ember-test-helpers';

module('Integration | Component | add-employee-nav', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(4);
    

    this.router = {
      transitionTo(path) {
        assert.equal(path, '/users/new');
      }
    }

    await render(hbs`
      <AddEmployeeNav @router={{this.router}}/>
       
    `);
   

    assert.dom('[data-test-id="subNav-header"]').exists();
    assert.dom('[data-test-id="subNav-tabs"]').exists();
    assert.dom('[data-test-id="subNav-employee-text"]').hasText('Employees');
    await click('[data-test-id="addEmployee"]');


  });
});
