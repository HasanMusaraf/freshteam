import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';

module('Integration | Component | user-avatar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the image', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.person = {
      firstName: "hasan",
      image: true
    }
    this.store = this.owner.lookup('service:store');
    this.model = this.store.createRecord('user',this.person);
    set(this,'user',this.model);

    // Template block usage:
    await render(hbs`
    <UserAvatar @user={{this.user}} @model={{this.model}} />
    `);
  
    assert.dom('[data-test-id="profile-container"]').exists();
    assert.dom('[data-test-id="has-image"]').exists();
    assert.dom('[data-test-id="user-avatar"]').doesNotExist();

  });

  test('it renders user avatar', async function(assert) {

    this.persons = {
      firstName: "hasan",
      image: false
    }

    this.store = this.owner.lookup('service:store');
     this.model = this.store.createRecord('user',this.persons);
     set(this,'user',this.model);
 
    // Template block usage:
    await render(hbs`
    <UserAvatar @user={{this.user}} @model={{this.model}} />
    `);

      assert.dom('[data-test-id="user-avatar"]').exists();
      assert.dom('[data-test-id="has-image"]').doesNotExist();
      assert.dom('[data-test-id="profileChar"]').hasText('h');


  });

});
