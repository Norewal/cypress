import { LoginInfo } from '../index'

describe('sorting', { testIsolation: false }, () => {
  before(() => {
    const user: LoginInfo = Cypress.env('users').standard
    if (!user) {
      throw new Error('Missing the standard user')
    }
    cy.dataSession({
      name: 'user session',
      shareAcrossSpecs: true,
      setup() {
        cy.log('**log in**')
        cy.visit('/')
        // cy.get('[data-test="username"]').type('standard_user')
        // cy.get('[data-test="password"]').type('secret_sauce')
        // cy.get('[data-test="login-button"]').click()
        // cy.getByTest('username').type('standard_user')
        // cy.getByTest('password').type('secret_sauce')
        cy.getByTest('username').type(user.username)
        cy.getByTest('password').type(user.password)
        cy.getByTest('login-button').click()
        cy.location('pathname').should('equal', '/inventory.html')

        cy.getCookie('session-username').should('exist')
      },
      recreate(userCookie: any) {
        cy.setCookie('session-username', userCookie.value, userCookie)
        cy.visit('/inventory.html')
      },
    })

    cy.location('pathname').should('equal', '/inventory.html')
  })

  //info:
  // devTool/console/ Cypress.getDataSessionDetails('user session')

  /**
   * Sorts item by price or name
   * @param {'lohi'|'hilo'|'az'|'za'} order
   */
  function sortBy(order: 'lohi' | 'hilo' | 'az' | 'za') {
    // confirm the argument value at runtime
    expect(order, 'sort order').to.be.oneOf(['lohi', 'hilo', 'az', 'za'])
    cy.log(`**sort by ${order}**`)
    cy.getByTest('product_sort_container').select(order)
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
    return cy.get('.inventory_item_name').map('innerText').print('items %o')
  }

  it('by price lowest to highest', () => {
    sortBy('lohi')
    getPrices().should('be.ascending')
  })

  it('by price highest to highest', () => {
    sortBy('hilo')
    // confirm the item prices are sorted from highest to lowest
    getPrices().should('be.descending')
  })

  it('by name from A to Z', () => {
    sortBy('az')
    getNames().should('be.ascending')
  })

  it('by name from Z to A', () => {
    sortBy('za')
    getNames().should('be.descending')
  })

  it('does nothing for invalid sort options', () => {
    // the current sort option
    cy.contains('.active_option', 'Name (A to Z)')
    cy.getByTest('product_sort_container').invoke(
      'append',
      '<option value="nope">Nope</option>',
    )
    cy.getByTest('product_sort_container').select('nope')
    // the active sort option is blank
    cy.get('.active_option').should('have.text', '')
  })
})
