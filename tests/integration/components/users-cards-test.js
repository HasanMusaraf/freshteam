import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, typeIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | users-cards', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    this.store = this.owner.lookup('service:store');
    this.model = this.store.createRecord('user', {
      firstName: "Mohamed",
      lastName: 'Musaraf',
      active: true,
      team: 'Freshteam',
      joiningDate: '2022-12-5'

    })
    , this.store.createRecord('user',{ 
      firstName: "Shalini",
      lastName: 'Sivakumar',
      active: true,
      team: 'Freshsales',
      joiningDate: '2022-12-8'

    }), this.store.createRecord('user',{ 
      firstName: "Aswath",
      lastName: 'Kaja',
      active: true,
      team: 'Freshchat',
      joiningDate: '2022-12-7'

    });

  });

 test('it renders Filtered User by Team', async function(assert) {
   // Template block usage: 
  await render(hbs`
    <UsersCards />
  `);

  await click('[data-test-id="filterby"]')
  assert.dom('[data-test-id="all-teams"]').exists();
  assert.dom('[data-test-id="Freshteam"]').hasText('Freshteam');
  assert.dom('[data-test-id="Freshsales"]').hasText('Freshsales');
  await click('[data-test-id="Freshteam"]');
  assert.dom('[data-test-id="full-name"]').hasText('Mohamed Musaraf');
  assert.dom('[data-test-id="current-team"]').hasText('Freshteam');

  await click('[data-test-id="filterby"]')
  await click('[data-test-id="Freshsales"]');
  assert.dom('[data-test-id="full-name"]').hasText('Shalini Sivakumar');
  assert.dom('[data-test-id="current-team"]').hasText('Freshsales');

  });


  test('it renders and check sortBy order is present', async function(assert) {
    // Template block usage: 

   await render(hbs`
     <UsersCards />
   `);
 
   await click('[data-test-id="sortby"]');
   assert.dom('[data-test-id="firstName"]').hasText('First Name');
   assert.dom('[data-test-id="lastName"]').hasText('Last Name');
   assert.dom('[data-test-id="asc"]').hasText('Ascending');
   assert.dom('[data-test-id="desc"]').hasText('Descending');

  });


  test('it renders sortBy FirstName', async function(assert) {
    // Template block usage: 

   await render(hbs`
     <UsersCards />
   `);
 
    // Sortby FirstName
    await click('[data-test-id="sortby"]');
    await click(('[data-test-id="firstName"]'));
    assert.dom('[data-test-id="current-order-type"]').hasText('First Name');

    // Descending Order
    await click('[data-test-id="sortby"]');
    await click(('[data-test-id="desc"]'));
    assert.dom('[data-test-id="user-card"]:nth-child(3)').hasTextContaining('Aswath Kaja');
    assert.dom('[data-test-id="user-card"]:nth-child(2)').hasTextContaining('Mohamed Musaraf');
    assert.dom('[data-test-id="user-card"]:nth-child(1)').hasTextContaining('Shalini Sivakumar');
 
    // Ascending Order
    await click('[data-test-id="sortby"]');
    await click(('[data-test-id="asc"]'));
    assert.dom('[data-test-id="user-card"]:nth-child(1)').hasTextContaining('Aswath Kaja');
    assert.dom('[data-test-id="user-card"]:nth-child(2)').hasTextContaining('Mohamed Musaraf');
    assert.dom('[data-test-id="user-card"]:nth-child(3)').hasTextContaining('Shalini Sivakumar');
  });

  test('it renders sortBy LastName', async function(assert) {
    // Template block usage: 

   await render(hbs`
     <UsersCards />
   `);
 
    //Sortby LastName
    await click('[data-test-id="sortby"]');
    await click(('[data-test-id="lastName"]'));
    assert.dom('[data-test-id="current-order-type"]').hasText('Last Name');

    // Descending Order
    await click('[data-test-id="sortby"]');
    await click(('[data-test-id="desc"]'))
    assert.dom('[data-test-id="user-card"]:nth-child(3)').hasTextContaining('Aswath Kaja');
    assert.dom('[data-test-id="user-card"]:nth-child(2)').hasTextContaining('Mohamed Musaraf');
    assert.dom('[data-test-id="user-card"]:nth-child(1)').hasTextContaining('Shalini Sivakumar');

    // Ascending Order
    await click('[data-test-id="sortby"]');
    await click(('[data-test-id="asc"]'))
    assert.dom('[data-test-id="user-card"]:nth-child(1)').hasTextContaining('Aswath Kaja');
    assert.dom('[data-test-id="user-card"]:nth-child(2)').hasTextContaining('Mohamed Musaraf');
    assert.dom('[data-test-id="user-card"]:nth-child(3)').hasTextContaining('Shalini Sivakumar');
  });

  test('it renders sortBy Joining Date', async function(assert) {
    // Template block usage: 

   await render(hbs`
     <UsersCards />
   `);
 
    //Sortby joiningDate
    await click('[data-test-id="sortby"]');
    await click(('[data-test-id="joiningDate"]'));
    assert.dom('[data-test-id="current-order-type"]').hasText('Joining Date');

    // Descending Order
    await click('[data-test-id="sortby"]');
    await click(('[data-test-id="desc"]'))
    assert.dom('[data-test-id="user-card"]:nth-child(2)').hasTextContaining('Aswath Kaja');
    assert.dom('[data-test-id="user-card"]:nth-child(3)').hasTextContaining('Mohamed Musaraf');
    assert.dom('[data-test-id="user-card"]:nth-child(1)').hasTextContaining('Shalini Sivakumar');

    // Ascending Order
    await click('[data-test-id="sortby"]');
    await click(('[data-test-id="asc"]'))
    assert.dom('[data-test-id="user-card"]:nth-child(2)').hasTextContaining('Aswath Kaja');
    assert.dom('[data-test-id="user-card"]:nth-child(1)').hasTextContaining('Mohamed Musaraf');
    assert.dom('[data-test-id="user-card"]:nth-child(3)').hasTextContaining('Shalini Sivakumar');
  });


    test('it renders user-list by Search', async function(assert) {
       // Template block usage: 
      await render(hbs`
        <UsersCards />
      `);
    
      // Default order is Ascending
      await typeIn('[data-test-id="search"] input', 'a');
      assert.dom('[data-test-id="user-card"]:nth-child(1)').hasTextContaining('Aswath Kaja');
      assert.dom('[data-test-id="user-card"]:nth-child(2)').hasTextContaining('Mohamed Musaraf');
      assert.dom('[data-test-id="user-card"]:nth-child(3)').hasTextContaining('Shalini Sivakumar');

      await click('[data-test-id="sortby"]');
      await click(('[data-test-id="desc"]'))
      assert.dom('[data-test-id="user-card"]:nth-child(3)').hasTextContaining('Aswath Kaja');
      assert.dom('[data-test-id="user-card"]:nth-child(2)').hasTextContaining('Mohamed Musaraf');
      assert.dom('[data-test-id="user-card"]:nth-child(1)').hasTextContaining('Shalini Sivakumar');
  
    });


    test('it renders user-list no-data found', async function(assert) {
      // Template block usage: 
     await render(hbs`
       <UsersCards />
     `);
   
     // Default order is Ascending
     await typeIn('[data-test-id="search"] input', '9');
     assert.dom('[data-test-id="user-card"]').doesNotExist();
     assert.dom('[data-test-id="no-data"]').exists();

   });



  test('it renders user-data found', async function(assert) {
     // Template block usage: 
    await render(hbs`
      <UsersCards />
    `);
  
    assert.dom('[data-test-id="user-card"]').exists();
    assert.dom('[data-test-id="no-data"]').doesNotExist()
    });
  
});