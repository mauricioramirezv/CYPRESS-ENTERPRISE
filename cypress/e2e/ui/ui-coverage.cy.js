describe('UI Coverage', () => {

  it('should cover main UI flow', () => {

    cy.visit('/')

    cy.get('[data-cy="username"]').type('test')
    cy.get('[data-cy="password"]').type('123456')
    cy.get('[data-cy="login-btn"]').click()
  })
})
