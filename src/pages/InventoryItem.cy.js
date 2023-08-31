import InventoryItem from './InventoryItem'
import { InventoryData } from '../utils/InventoryData'
import { InventoryPage } from '../../cypress/support/pages/inventoryPage'

describe('InventoryItem', { viewportHeight: 1000 }, () => {
  it('shows an item', () => {
    // what do you see when you try to mount the component?
    // cy.mount(<InventoryItem />)
    //
    // pick a random number between 0 and the inventory length
    // using Lodash Cypress._.random method
    const id = Cypress._.random(0, InventoryData.length - 1)
    //
    // mount the InventoryItem component
    // passing your own search string "id=..."
    // Tip: modify the InventoryItem to read the window.location.search
    // or the passed search prop
    cy.mountWithRouter(<InventoryItem search={'id=' + id} />)
    const item = InventoryData[id]
    //
    // confirm the component shows the item's name, description, and price
    cy.get('.inventory_details_desc_container').within(() => {
      cy.contains('.inventory_details_name', item.name)
      cy.contains('.inventory_details_desc', item.desc)
      cy.contains('.inventory_details_price', '$' + item.price)
    })
  })

  it('adds an item to the cart and then removes it', () => {
    // mount an inventory item with id 1
    // cy.mountWithRouter
    cy.mountWithRouter(<InventoryItem search="id=1" />)
    //
    // find the button with text "Add to cart"
    // and click on it
    cy.contains('button', 'Add to cart').click('')
    // get the "cart-contents" from the local storage
    // and verify it contains an array with just number 1 inside
    // cy.mountWithRouter(<InventoryItem search="id=1" />)
    // cy.contains('button', 'Add to cart').click()
    // expect(localStorage.getItem('cart-contents')).to.equal('[1]')
    //  Mixing asynchronous and synchornous code localStorage.getItem... does not work
    //The expect(localStorage)... code will execute before we mount the component and click the button. Not going to work.
    //
    // find the button with text "Remove" and click on it
    //
    // verify the local storage has cart contents as an empty list

    //
    // confirm the cart badge is visible and has 1
    // Tip: you can use page objects in this test
    InventoryPage.getCartBadge().should('be.visible').and('have.text', 1)
    // .pause()
    //
    // find the button with text "Remove" and click on it
    cy.contains('button', 'Remove').click('')
    //
    // the cart badge should be gone
    InventoryPage.getCartBadge().should('not.exist')
  })
  it('stores the cart items in the local storage (cy.then)', () => {
    cy.mountWithRouter(<InventoryItem search="id=1" />)
    cy.contains('button', 'Add to cart')
      .click()
      // get the "cart-contents" from the local storage
      // and verify it contains an array with just number 1 inside
      .then(() => {
        expect(localStorage.getItem('cart-contents')).to.equal(
          '[{"id":1,"n":1}]',
        )
      })
    // find the button with text "Remove" and click on it
    cy.contains('button', 'Remove')
      .click()
      // verify the local storage has cart contents as an empty list
      .then(() => {
        expect(localStorage.getItem('cart-contents')).to.equal('[]')
      })
  })

  // //What happens if our application is setting the localStorage after a small delay? Well, we are only checking the item inside cy.then once.
  // //To keep retrying, we need to change cy.then(callback) to cy.should(callback) to make it retry.
  it('stores the cart items in the local storage (cy.should)', () => {
    cy.mountWithRouter(<InventoryItem search="id=1" />)
    cy.contains('button', 'Add to cart')
      .click()
      // get the "cart-contents" from the local storage
      // and verify it contains an array with just number 1 inside
      // by retrying an assertion
      .should(() => {
        expect(localStorage.getItem('cart-contents')).to.equal(
          '[{"id":1,"n":1}]',
        )
      })
    // find the button with text "Remove" and click on it
    cy.contains('button', 'Remove')
      .click()
      // verify the local storage has cart contents as an empty list
      // by retrying an assertion
      .should(() => {
        expect(localStorage.getItem('cart-contents')).to.equal(
          '[{"id":1,"n":1}]',
        )
      })
  })
  //Even better it to place localStorage.getItem method into Cypress queue of commands using cy.wrap and cy.invoke combination:
  it('stores the cart items in the local storage', () => {
    cy.mountWithRouter(<InventoryItem search="id=1" />)
    cy.contains('button', 'Add to cart').click()
    // get the "cart-contents" from the local storage
    // and verify it contains an array with just number 1 inside
    cy.wrap(localStorage)
      .invoke('getItem', 'cart-contents')
      // the local storage entry is a string
      .apply(JSON.parse)
      .should('deep.equal', [{ id: 1, n: 1 }])
    // find the button with text "Remove" and click on it
    cy.contains('button', 'Remove').click()
    // verify the local storage has cart contents as an empty list
    cy.wrap(localStorage)
      .invoke('getItem', 'cart-contents')
      // the local storage entry is a string
      // convert it to an array
      .apply(JSON.parse)
      .should('deep.equal', [])
  })
})
