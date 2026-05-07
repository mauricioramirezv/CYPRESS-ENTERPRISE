describe('Accessibility Testing', () => {

  beforeEach(() => {

    cy.visit('/')
    cy.injectAxe()
  })

  it('should not have accessibility violations', () => {

    cy.checkA11y()
  })
})
