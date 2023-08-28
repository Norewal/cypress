import { LoginPage } from '@support/pages/loginPage'
import { LoginInfo } from '../index'
import { InventoryData } from '@fixtures/inventoryData'
import { InventoryPage } from '@support/pages/inventoryPage'

describe('Cart', () => {
  const user: LoginInfo = Cypress.env('users').standard
  // we can even check if the user object is valid
  if (!user) {
    throw new Error('Missing the standard user')
  }

  // before each test, quickly login the user
  // or restore the previous user session
  beforeEach(() => {
    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html')
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it(
    'shows the added items in order they were added',
    { viewportHeight: 1200 },
    () => {
      const items = [
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Onesie',
      ]
      //find id for each item by name and store them in an array
      const ids = items.map(
        (name) => Cypress._.find(InventoryData, { name })!.id,
      )
      // add each item to cart using the InventoryPage object
      items.forEach(InventoryPage.addItemToCart)
      cy.log('**added all items to cart**')
      InventoryPage.getCartBadge()
        .should('have.text', items.length)
        .scrollIntoView()
        .wait(1000)
        .click()

      // set the ids in the local storage item "cart-contents"
      // Tip: local storage usually has stringified data
      // window.localStorage.setItem('cart-contents', JSON.stringify(ids))

      cy.location('pathname').should('equal', '/cart.html')
      // confirm each item name is present
      // confirm the cart items list has the right number of elements
      cy.get('.cart_list .cart_item').should('have.length', items.length)

      cy.log('**shows each item in order**')
      // iterate over the items
      items.forEach((itemName, k) => {
        // confirm each item is at the right place
        // on the page in the list of items
        // https://on.cypress.io/get
        // https://on.cypress.io/eq
        cy.get('.cart_list .cart_item')
          .eq(k)
          .within(() => {
            // and confirm that within the item the name
            // is correct and the quantity is 1
            cy.contains('.inventory_item_name', itemName)
            cy.contains('.cart_quantity', 1)
          })
      })

      // // add each item to cart using the InventoryPage object
      // items.forEach(InventoryPage.addItemToCart)
      // cy.log('**added all items to cart**')
      // // confirm the cart badge shows the right number of items
      // // then click on it
      // // https://on.cypress.io/click
      // InventoryPage.getCartBadge()
      //   .should('have.text', items.length)
      //   .scrollIntoView()
      //   .wait(1000)
      //   .click()
      // // confirm we move to the cart page
      // // https://on.cypress.io/location
      // cy.location('pathname').should('equal', '/cart.html')
      // // confirm the cart items list has the right number of elements
      // cy.get('.cart_list .cart_item').should('have.length', items.length)
      // cy.log('**shows each item in order**')
      // // iterate over the items
      // items.forEach((itemName, k) => {
      //   // confirm each itm is at the right place
      //   // on the page in the list of items
      //   // https://on.cypress.io/get
      //   // https://on.cypress.io/eq
      //   cy.get('.cart_list .cart_item')
      //     .eq(k)
      //     .within(() => {
      //       // and confirm that within the item the name
      //       // is correct and the quantity is 1
      //       cy.contains('.inventory_item_name', itemName)
      //       cy.contains('.cart_quantity', 1)
      //     })
      // })

      //The test checks the page, but the application also stores the ids of the items in the cart in the window.localStorage
      //application/storage/local storage/loc:3000
      //Assuming the item ids are indeed 0, 1, and 2, can you confirm the right array of ids is stored in the local storage?

      // get the application window object
      // https://on.cypress.io/window
      // cy.window()
      //   // get its property "localStorage"
      //   // https://on.cypress.io/its
      //   .its('localStorage')
      //   // and call the method "getItem" to get the cart contents
      //   // https://on.cypress.io/invoke
      //   .invoke('getItem', 'cart-contents')
      //   .should('exist')
      //   // confirm the list is [0, 1, 2]
      //   // https://glebbahmutov.com/cypress-examples/commands/assertions.html
      //   // Tip: local storage usually has stringified JSON
      //   // @ts-ignore
      //   .then(JSON.parse)
      //   // .should('deep.equal', [0, 1, 2])
      //   .should('deep.equal', ids)
    },
  )
})
