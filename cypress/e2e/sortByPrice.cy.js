// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

// https://github.com/bahmutov/cypress-map
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

  // Sorts items by price
  // @param {'lohi'| 'hilo'} order

  function sortByPrice(order) {
    expect(order, 'sort order').to.be.oneOf(['lohi', 'hilo'])
    cy.log(`**sort by price ${order}**`)
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
    sortByPrice('lohi')
    getPrices().should('be.ascending')
  })

  it('by price highest to lowest', () => {
    cy.log('**sort by price low to high**')
    // sort the items from high to low price
    // confirm the item prices are sorted from highest to lowest
    // cy.get('[data-test="product_sort_container"]').select('hilo')
    // cy.get('.inventory_item_price')
    //   .map('innerText')
    //   .mapInvoke('slice', 1)
    //   .map(Number)
    //   .print('prices %o')
    //   .should('be.descending')
    sortByPrice('hilo')
    getPrices().should('be.descending')
  })
})
