// import the bike light JSON fixture file
// using the relative path
import item from '@fixtures/bikeLight.json'
import { LoginInfo } from '..'

beforeEach(() => {
  const user: LoginInfo = Cypress.env('users').standard
  // we can even check if the user object is valid
  if (!user) {
    throw new Error('Missing the standard user')
  }

  cy.log('**log in**')
  cy.visit('/')
  cy.getByTest('username').type(user.username)
  cy.getByTest('password').type(user.password)
  cy.get('[data-test="login-button"]').click()
  cy.location('pathname').should('equal', '/inventory.html')
})

it('has an item with details', () => {
  // and confirm there is an item in the inventory
  // with the name, description, and price listed in teh fixture object
  // https://on.cypress.io/contains
  // https://on.cypress.io/within
  cy.contains('.inventory_item', item.name).within(() => {
    cy.contains('.inventory_item_name', item.name)
    cy.contains('.inventory_item_desc', item.description)
    cy.contains('.inventory_item_price', item.price)
  })
})
