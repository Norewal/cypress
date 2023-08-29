import { LoginInfo } from '..'
import { LoginPage } from '@support/pages/loginPage'
import { InventoryPage } from '@support/pages/inventoryPage'
import { InventoryData } from '@fixtures/inventoryData'
import { CheckoutPage } from '@support/pages/checkoutPage'

const user: LoginInfo = Cypress.env('users').problem
// pick a random item to buy
const item = Cypress._.sample(InventoryData)

// add more assertions to the this test
// or to the code it calls to understand
// exactly where the application goes wrong

it.skip('works for user problem user', { viewportHeight: 1200 }, () => {
  LoginPage.login(user.username, user.password)
  cy.visit('/inventory.html')
  InventoryPage.addItemToCart(item!.name)

  cy.visit('/checkout-step-one.html')
  CheckoutPage.fillInformationForm().submit()

  cy.location('pathname').should('equal', '/checkout-step-two.html')
  cy.get('.cart_list .cart_item').should('have.length', 1)
  cy.contains('.summary_subtotal_label', '$' + item?.price)
  cy.contains('[data-test=finish]', 'Finish').click()

  cy.location('pathname').should('equal', '/checkout-complete.html')
  cy.get('#checkout_complete_container').should('be.visible')
})
