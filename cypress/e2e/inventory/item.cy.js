import item from ' @fixtures/bikeLight.json'

beforeEach(() => {
  cy.log('**log in**')
  cy.visit('/')
  cy.get('[data-test="username"]').type('standard_user')
  cy.get('[data-test="password"]').type('secret_sauce')
  cy.get('[data-test="login-button"]').click()
  cy.location('pathname').should('equal', '/inventory.html')
})

it('has an item with details', () => {
  // confirm there is an item in the inventory
  // with:
  // name: "Sauce Labs Bike Light"
  // description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night"
  // price: $9.99
  // https://on.cypress.io/contains
  // https://on.cypress.io/within
  // cy.contains('.inventory_item', 'Sauce Labs Bike Light').within(() => {
  // cy.contains('.inventory_item_name', 'Sauce Labs Bike Light')
  // cy.contains(
  // '.inventory_item_desc',
  // "A red light isn't the desired state in testing but it sure helps when riding your bike at night",
  // )
  // cy.contains('.inventory_item_price', '$9.99')
  // })
})

it('has an item with details', () => {
  // and confirm there is an item in the inventory
  // with the name, description, and price listed in the fixture object
  // https://on.cypress.io/contains
  // https://on.cypress.io/within
  console.log(item)
  cy.contains('.inventory_item', item.name).within(() => {
    cy.contains('.inventory_item_name', item.name)
    cy.contains('.inventory_item_desc', item.description)
    cy.contains('.inventory_item_price', item.price)
  })
})
