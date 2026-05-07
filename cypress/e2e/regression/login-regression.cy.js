describe('Regression Testing', () => {

  beforeEach(() => {

    cy.visit('/')
  })

  it('should login successfully', () => {

    cy.get('[data-cy="username"]').type('admin')
    cy.get('[data-cy="password"]').type('admin123')
    cy.get('[data-cy="login-btn"]').click()
  })
})
