import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';

module('Integration | Component | user-count', function(hooks) {
  setupRenderingTest(hooks);

 test('it renders user-data found', async function(assert) {
  this.store = this.owner.lookup('service:store');
  this.model = this.store.createRecord('user', {
    firstName: "Mohamad",
    lastName: 'musaraf',
    active: true
  });
  set(this,'user',this.model)
   // Template block usage: 
  await render(hbs`
    <UserCount />
  `);

  assert.dom('[data-test-id="user-cards-wrapper"]').exists();
  assert.dom('[data-test-id="user-card"]').exists();
  assert.dom('[data-test-id="no-data"]').doesNotExist()
  });

  test('it renders no-data found', async function(assert) {
    await render(hbs`
     <UserCount  />
    `);

    assert.dom('[data-test-id="user-card"]').doesNotExist();
    assert.dom('[data-test-id="no-data"]').exists()
    assert.dom('[data-test-id="no-list-view"]').hasTextContaining('No employees to list')
    assert.dom('[data-test-id="try-something-msg"]').hasTextContaining('Try looking for something')

  });

});
