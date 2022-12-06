import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';


module('Integration | Component | user-card', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {

    this.store = this.owner.lookup('service:store');
    this.model = this.store.createRecord('user', {
      firstName: "hasan",
      lastName: "musaraf",
      email: "hasan@freshworks.com",
      id: 1,
      active: true,
      team: 'Freshteam',
      joiningDate: '2022-12-5'

    })
    , this.store.createRecord('user',{ 
      firstName: "Shalini",
      lastName: 'Sivakumar',
      email: "shalini@freshworks.com",
      id: 2,
      active: true,
      team: 'Freshsales',
      joiningDate: '2022-12-8'

    }), this.store.createRecord('user',{ 
      firstName: "Aswath",
      lastName: 'Kaja',
      email: "aswath@freshworks.com",
      id: 3,
      active: true,
      team: 'Freshchat',
      joiningDate: '2022-12-7'

    });


    set(this,'user',this.model)

    await render(hbs`
    <UserCard @user={{this.user}} />
  `);

  });


  test('it renders', async function(assert) {


    // Template block usage:

    assert.dom('[data-test-id="user-card"]').exists();
    assert.dom('[data-test-id="full-name"]').hasTextContaining('hasan musaraf');
    assert.dom('[data-test-id="email"]').hasText('hasan@freshworks.com');
    assert.dom('[data-test-id="edit-icon"]').exists();
    assert.dom('[data-test-id="delete-icon"]').exists()


  });

  test('it renders Confirmation popup ', async function(assert) {

    await click('[data-test-id="delete-icon"]')
    assert.dom('.delete-exclamation').exists();
    assert.dom('.confirmation-text').hasTextContaining('Do you wish to remove');
    assert.dom('.cancel-btn').hasText('Cancel');
    assert.dom('.save-btn').hasText('Save');
  });


  test('If Cancel button is working fine', async function(assert) {

    await click('[data-test-id="delete-icon"]')
    await click('.cancel-btn')
    assert.dom('.delete-exclamation').doesNotExist();
    assert.dom('.confirmation-text').doesNotExist();
    assert.dom('.cancel-btn').doesNotExist();
    assert.dom('.save-btn').doesNotExist();

  });

  test('If Save button is working fine', async function(assert) {

    await click('[data-test-id="delete-icon"]')
    await click('.save-btn')
    assert.dom('.delete-exclamation').doesNotExist();
    assert.dom('.confirmation-text').doesNotExist();
    assert.dom('.cancel-btn').doesNotExist();
    assert.dom('.save-btn').doesNotExist();
  });

});
