import { LoginPage } from './loginPage'

describe('anonymous user', () => {
  it('gets an error trying to visit the inventory page', () => {
    cy.visit('/inventory.html')
    // confirm we are on root page
    // https://on.cypress.io/location
    cy.location('pathname').should('equal', '/')

    // confirm the page shows an error
    // confirm the error message includes the page name
    // https://on.cypress.io/contains
    LoginPage.getError('be.visible')
      .and('include.text', 'Epic sadface: ') //no need full text
      .and('include.text', '/inventory.html')
    // confirm the username and the password fields
    // have the "error" CSS class included
    LoginPage.getUsername().should('have.class', 'error')
    LoginPage.getPassword().should('have.class', 'error')
  })
})
