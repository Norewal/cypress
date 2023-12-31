import { LoginPage } from '@support/pages/loginPage'

describe('Login form', () => {
  // visit the login page before each test
  beforeEach(() => {
    cy.visit('/')
  })

  // it.only('shows an error for empty username field', () => {
  it('shows an error for empty username field', () => {
    // click on the login button without
    // entering any of the information
    LoginPage.getLogin().click()

    //
    // the login page should show the error
    // with text "Epic sadface: Username is required"
    LoginPage.showsError('Epic sadface: Username is required')
  })

  it('shows an error for empty password field', () => {
    // enter username "name" into the input field
    LoginPage.getUsername().type('blabla')
    // and click the login button
    // without entering the password
    LoginPage.getLogin().click()
    //
    // the login page should show the error
    // with text "Epic sadface: Password is required"
    LoginPage.showsError('Epic sadface: Password is required')
  })
})
