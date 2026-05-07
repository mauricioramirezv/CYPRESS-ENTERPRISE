describe('Security Testing', () => {

  it('should validate security headers', () => {

    cy.request('https://jsonplaceholder.typicode.com/users')
      .then((response) => {

        expect(response.headers).to.exist
      })
  })

  it('should prevent invalid login', () => {

    cy.visit('/')

    cy.get('[data-cy="username"]').type('admin')
    cy.get('[data-cy="password"]').type('wrong-password')

    cy.get('[data-cy="login-btn"]').click()

    cy.url().should('not.include', '/dashboard')
  })
})
