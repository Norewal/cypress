export const LoginPage = {
  selectors: {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    form: '.login-box form',
  },

  getUsername() {
    // return cy.get('[data-test="username"]')
    return cy.get(LoginPage.selectors.username)
  },
  getPassword() {
    // return cy.get('[data-test="password"]')
    return cy.get(LoginPage.selectors.password)
  },
  getError() {
    // return cy.get('[data-test=error]')
    return cy.getByTest('error')
  },
  noErrors() {
    cy.log('**there are no errors**')
    LoginPage.getError().should('not.exist')
    LoginPage.getUsername().should('not.have.class', 'error')
    LoginPage.getPassword().should('not.have.class', 'error')
  },
  getLogin() {
    // return cy.get('[data-test="login-button"]')
    return cy.getByTest('login-button')
  },

  showsError(text: string) {
    cy.log('**error:...**')
    LoginPage.getError().should('have.text', text).should('be.visible')
    LoginPage.getUsername().should('have.class', 'error')
    LoginPage.getPassword().should('have.class', 'error')
  },

  /**
   * Logs the user and caches the session
   * @param username
   * @param password
   */

  login(username: string, password: string) {
    // let userCookie
    cy.session(
      `user ${username} login`,
      () => {
        cy.log('**log in**')
        cy.visit('/')
        // LoginPage.getUsername().type(username)
        // // hide the password from the Console Log
        // LoginPage.getPassword().type(password, { log: false })
        cy.get(LoginPage.selectors.form).fillForm({
          [LoginPage.selectors.username]: username,
          [LoginPage.selectors.password]: password,
        })
        LoginPage.getUsername().should('have.value', username)
        LoginPage.getPassword().should('have.value', password)
        LoginPage.getLogin().click()
        cy.location('pathname').should('equal', '/inventory.html')
      },
      {
        validate() {
          cy.log('**validate login session**')
          // try visiting the page and
          // confirm the browser stays at /inventory.html
          // cy.visit('/inventory.html')
          // cy.location('pathname').should('equal', '/inventory.html')

          //first way:
          // cy.getCookie('session-username')
          //   .should('exist')
          //   .then((cookie) => {
          //     if (!cookie) {
          //       return false
          //     }
          //   })

          //make it shorter:
          // 1: casting `null` to false
          // cy.getCookie('session-username').then(Boolean)
          //2: using assertion
          cy.getCookie('session-username').should('exist')
        },
      },
    )
  },
  // as const at the end of the spec->
  //This prevents any spec file from changing properties inside our login page.
  //For example, no spec code can overwrite the username selector.
} as const
