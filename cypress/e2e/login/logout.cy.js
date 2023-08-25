import { LoginPage } from '../../support/pages/loginPage'

it('logs out', () => {
  /** @type {{username: string, password: string}} */
  const user = Cypress.env('users').standard
  // use LoginPage to log the standard user in
  // LoginPage.login(username, password)
  LoginPage.login(user.username, user.password)

  // confirm we are logged in by visiting the inventory page
  // https://on.cypress.io/visit
  cy.visit('/inventory.html')

  // https://on.cypress.io/location
  cy.location('pathname').should('equal', '/inventory.html')

  // open the hamburger menu
  // https://on.cypress.io/contains
  // https://on.cypress.io/click
  cy.contains('button', 'Open Menu').click()

  // the menu should appear
  cy.get('.bm-menu-wrap')
    .should('be.visible')
    .contains('.menu-item', 'Logout')
    .wait(1000)
    .click()
  // in the menu find the "Logout" option and click on it
  // we should be transported back to the index page "/"
  // Confirm that we cannot go to the inventory page again
  // and that the right error message is shown
  // https://on.cypress.io/visit
  cy.location('pathname').should('equal', '/')
  cy.visit('/inventory.html')
  LoginPage.showsError(
    "Epic sadface: You can only access '/inventory.html' when you are logged in.",
  )
  // LoginPage.showsError
})
