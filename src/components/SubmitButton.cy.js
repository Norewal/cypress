// import the submit button component
import SubmitButton from './SubmitButton'

it('shows the submit button', () => {
  // mount the SubmitButton
  // passing value, custom class, and test id props
  cy.mount(
    <SubmitButton
      customClass="submit-button"
      testId="continue"
      value="Continue"
      //   onClick={cy.stub().as('click')}
    />,
  )
  //
  // confirm the component appears on the page
  // and has the expected value and attributes
  cy.contains('input.submit-button', 'Continue')
    .should('have.value', 'Continue')
    .and('have.attr', 'data-test', 'continue')
    .and('have.attr', 'id', 'continue')
    .and('have.attr', 'name', 'continue')
})
