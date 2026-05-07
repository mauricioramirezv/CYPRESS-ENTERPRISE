describe('Cypress Studio Demo', () => {

  it('studio generated example', () => {

    cy.visit('/')

    cy.get('[data-cy="username"]').type('studio-user')
    cy.get('[data-cy="password"]').type('studio-password')
    cy.get('[data-cy="login-btn"]').click()
  })
})
