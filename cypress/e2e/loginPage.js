// @ts-check
/// <reference types="cypress" />

export const LoginPage = {
  getUsername() {
    return cy.get('[data-test="username"]')
  },
  getPassword() {
    return cy.get('[data-test="password"]')
  },
  getError() {
    return cy.get('[data-test=error]')
  },
  noErrors() {
    cy.log('**there are no errors**')
    LoginPage.getError().should('not.exist')
    LoginPage.getUsername().should('not.have.class', 'error')
    LoginPage.getPassword().should('not.have.class', 'error')
  },
  getLogin() {
    return cy.get('[data-test="login-button"]')
  },
  showsError(text) {
    cy.log('**error:...**')
    LoginPage.getError().should('have.text', text).should('be.visible')
    LoginPage.getUsername().should('have.class', 'error')
    LoginPage.getPassword().should('have.class', 'error')
  },
  login(username, password) {
    cy.session(`user ${username} session`, () => {
      cy.visit('/')
      LoginPage.getUsername().type(username)
      LoginPage.getPassword().type(password, { log: false })
      LoginPage.getLogin().click()
      cy.location('pathname').should('equal', '/inventory.html')
    })
  },
}