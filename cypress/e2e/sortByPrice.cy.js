import 'cypress-map'

// https://www.chaijs.com/plugins/chai-sorted/
chai.use(require('chai-sorted'))

describe('sorting', () => {
  beforeEach(() => {
    cy.log('**log in**')
    cy.visit('/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.location('pathname').should('equal', '/inventory.html')
  })

  /**
   *Sorts items by price
   * @param {'lohi'| 'hilo'| 'az'| 'za'} order
   */

  function sortByPriceOrName(order) {
    expect(order, 'sort order').to.be.oneOf(['lohi', 'hilo', 'az', 'za'])
    cy.log(`**sort by ${order}**`)
    cy.get('[data-test="product_sort_container"]').select(order)
  }

  function getPrices() {
    return cy
      .get('.inventory_item_price')
      .map('innerText')
      .mapInvoke('slice', 1)
      .map(Number)
      .print('sorted prices %o')
  }

  function getNames() {
    return cy
      .get('.inventory_item_name')
      .map('innerText')
      .print('sorted prices %o')
  }

  it('by price lowest to highest', () => {
    // cy.log('**sort by price low to high**')
    // // sort the items from low to high
    // // confirm the item prices are sorted in ascending order
    // cy.get('[data-test="product_sort_container"]').select('lohi')
    // cy.get('.inventory_item_price')
    //   .map('innerText')
    //   .mapInvoke('slice', 1)
    //   .map(Number)
    //   .print('prices %o')
    //   .should('be.ascending')
    sortByPriceOrName('lohi')
    getPrices().should('be.ascending')
  })

  it('by price highest to lowest', () => {
    cy.log('**sort by price high to low **')
    // sort the items from high to low price
    // confirm the item prices are sorted from highest to lowest
    // cy.get('[data-test="product_sort_container"]').select('hilo')
    // cy.get('.inventory_item_price')
    //   .map('innerText')
    //   .mapInvoke('slice', 1)
    //   .map(Number)
    //   .print('prices %o')
    //   .should('be.descending')
    sortByPriceOrName('hilo')
    getPrices().should('be.descending')
  })

  it('by names from A to Z', () => {
    cy.log('**sort by name from A to Z **')
    sortByPriceOrName('az')
    getNames().should('be.ascending')
  })

  it('by names from Z to A', () => {
    cy.log('**sort by name from Z to A **')
    sortByPriceOrName('za')
    getNames().should('be.descending')
  })
})
