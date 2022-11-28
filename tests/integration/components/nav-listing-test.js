import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';


module('Integration | Component | nav-listing', function(hooks) {
  setupRenderingTest(hooks);

test('it renders', async function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });


  // Template block usage:
  await render(hbs`
  <NavListing  />
  `);

  assert.dom('[data-test-id="sideNav"]').exists();
  assert.dom('[data-test-id="sideNav-icon"]').exists();
  assert.dom('[data-test-id="topNav"]').exists();
  assert.dom('[data-test-id="topNav-tabs"]').exists();
  assert.dom('[data-test-id="topNav-text"]').hasText('Talent Center');
  assert.dom('[data-test-id="candidate-icon"]').exists();
  assert.dom('[data-test-id="footer"]').exists();
  assert.dom('[data-test-id="footer-text"]').includesText('HR Software by Freshworks');

});

});