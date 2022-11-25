import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { click } from 'ember-test-helpers';


module('Integration | Component | filter-by', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });


    // Template block usage:
    await render(hbs`
    <FilterBy />
    `);

    assert.dom('[data-test-id="hasFilterBy"]').hasText("Filter by");
    assert.dom('[data-test-id="bsDropdown"]').exists();
    await click('[data-test-id="bsDropdown"]');

  });
});
