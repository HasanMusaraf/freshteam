import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';


module('Integration | Component | user-card', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders user-card', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.person = {
      firstName: "hasan",
      lastName: "musaraf",
      email: "hasan@freshworks.com"
    }
    this.store = this.owner.lookup('service:store');
    this.model = this.store.createRecord('user',this.person);
    set(this,'user',this.model)

    // Template block usage:
    await render(hbs`
      <UserCard @user={{this.user}} />
    `);

    assert.dom('[data-test-id="user-card"]').exists();
    assert.dom('[data-test-id="full-name"]').hasTextContaining('hasan musaraf');
    assert.dom('[data-test-id="email"]').hasText('hasan@freshworks.com');

  });
});