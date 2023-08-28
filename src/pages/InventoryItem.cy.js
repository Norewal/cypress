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
})

describe('InventoryItem', { viewportHeight: 1000 }, () => {
  it('adds an item to the cart and then removes it', () => {
    // mount an inventory item with id 1
    // cy.mountWithRouter
    cy.mountWithRouter(<InventoryItem search="id=1" />)
    //
    // find the button with text "Add to cart"
    // and click on it
    cy.contains('button', 'Add to cart').click('')
    //
    // confirm the cart badge is visible and has 1
    // Tip: you can use page objects in this test
    InventoryPage.getCartBadge()
      .should('be.visible')
      .and('have.text', 1)
      .wait(1000)
    //
    // find the button with text "Remove" and click on it
    cy.contains('button', 'Remove').click('')
    //
    // the cart badge should be gone
    InventoryPage.getCartBadge().should('not.exist')
  })
})
