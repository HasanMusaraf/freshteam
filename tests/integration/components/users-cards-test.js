import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, typeIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';

module('Integration | Component | users-cards', function(hooks) {
  setupRenderingTest(hooks);

 test('it renders Filtered User by Team', async function(assert) {
  this.store = this.owner.lookup('service:store');
  this.model = this.store.createRecord('user', {
    firstName: "Mohamad",
    lastName: 'musaraf',
    active: true,
    team: 'Freshteam'
  })
  , this.store.createRecord('user',{ 
    firstName: "Shalini",
    lastName: 'Sivakumar',
    active: true,
    team: 'Freshsales'
  });
  set(this,'user',this.model)
   // Template block usage: 
  await render(hbs`
    <UsersCards />
  `);

  await click('[data-test-id="filterby"]')
  assert.dom('[data-test-id="all-teams"]').exists();
  assert.dom('[data-test-id="Freshteam"]').hasText('Freshteam');
  assert.dom('[data-test-id="Freshsales"]').hasText('Freshsales');
  await click('[data-test-id="Freshteam"]');
  assert.dom('[data-test-id="full-name"]').hasText('Mohamad musaraf');
  assert.dom('[data-test-id="current-team"]').hasText('Freshteam');

  await click('[data-test-id="filterby"]')
  await click('[data-test-id="Freshsales"]');
  assert.dom('[data-test-id="full-name"]').hasText('Shalini Sivakumar');
  assert.dom('[data-test-id="current-team"]').hasText('Freshsales');

  });


  test('it renders sortBy Userlist', async function(assert) {
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
    set(this,'user',this.model)
     // Template block usage: 

    await render(hbs`
      <UsersCards />
    `);
  
    await click('[data-test-id="sortby"]');
    assert.dom('[data-test-id="firstName"]').hasText('First Name');
    assert.dom('[data-test-id="lastName"]').hasText('Last Name');
    assert.dom('[data-test-id="asc"]').hasText('Ascending');
    assert.dom('[data-test-id="desc"]').hasText('Descending');

    // Sortby FirstName
    await click(('[data-test-id="firstName"]'));
    assert.dom('[data-test-id="current-order-type"]').hasText('First Name');


    await click('[data-test-id="sortby"]');
    await click(('[data-test-id="desc"]'));
    assert.dom('[data-test-id="full-name"]').hasText('Shalini Sivakumar');

    await click('[data-test-id="sortby"]');
    await click(('[data-test-id="asc"]'));
    assert.dom('[data-test-id="full-name"]').hasText('Aswath Kaja');

    //Sortby LastName
    await click('[data-test-id="sortby"]');
    await click(('[data-test-id="lastName"]'));
    assert.dom('[data-test-id="current-order-type"]').hasText('Last Name');

    
    await click('[data-test-id="sortby"]');
    await click(('[data-test-id="desc"]'))
    assert.dom('[data-test-id="full-name"]').hasText('Shalini Sivakumar');

    await click('[data-test-id="sortby"]');
    await click(('[data-test-id="asc"]'))
    assert.dom('[data-test-id="full-name"]').hasText('Aswath Kaja');

    //Sortby joiningDate
    await click('[data-test-id="sortby"]');
    await click(('[data-test-id="joiningDate"]'));
    assert.dom('[data-test-id="current-order-type"]').hasText('Joining Date');

    
    await click('[data-test-id="sortby"]');
    await click(('[data-test-id="desc"]'))
    assert.dom('[data-test-id="full-name"]').hasText('Shalini Sivakumar');

    await click('[data-test-id="sortby"]');
    await click(('[data-test-id="asc"]'))
    assert.dom('[data-test-id="full-name"]').hasText('Mohamed Musaraf');


    });
  

    test('it renders user-list by Search', async function(assert) {
      this.store = this.owner.lookup('service:store');
      this.model = this.store.createRecord('user', {
        firstName: "Mohamed",
        lastName: 'Musaraf',
        active: true,
        team: 'Freshteam'
      })
      , this.store.createRecord('user',{ 
        firstName: "Shalini",
        lastName: 'Sivakumar',
        active: true,
        team: 'Freshsales'
      }), this.store.createRecord('user',{ 
        firstName: "Aarav",
        lastName: 'Guru',
        active: true,
        team: 'Freshchat'
      });
      set(this,'user',this.model)
       // Template block usage: 
      await render(hbs`
        <UsersCards />
      `);
    
      await typeIn('[data-test-id="search"] input', 'a');
      assert.dom('[data-test-id="full-name"]').hasText('Aarav Guru');

    });


  test('it renders user-data found', async function(assert) {
    this.store = this.owner.lookup('service:store');
    this.model = this.store.createRecord('user', {
      firstName: "Mohamad",
      lastName: 'musaraf',
      active: true,
      team: 'Freshteam'
    })
    , this.store.createRecord('user',{ 
      firstName: "Shalini",
      lastName: 'Sivakumar',
      active: true,
      team: 'Freshsales'
    });
    set(this,'user',this.model)
     // Template block usage: 
    await render(hbs`
      <UsersCards />
    `);
  
    assert.dom('[data-test-id="user-card"]').exists();
    assert.dom('[data-test-id="no-data"]').doesNotExist()
    });
  


  test('it renders no-data found', async function(assert) {
    await render(hbs`
     <UsersCards  />
    `);

    assert.dom('[data-test-id="user-card"]').doesNotExist();
    assert.dom('[data-test-id="no-data"]').exists()
    assert.dom('[data-test-id="no-list-view"]').hasTextContaining('No employees to list')
    assert.dom('[data-test-id="try-something-msg"]').hasTextContaining('Try looking for something')

  });

});