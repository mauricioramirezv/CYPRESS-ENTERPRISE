import LoginForm from '../../src/components/LoginForm'

describe('Component Test - LoginForm', () => {

  it('should render correctly', () => {

    cy.mount(<LoginForm />)

    cy.contains('Login')
    cy.get('[data-cy="username"]').should('exist')
    cy.get('[data-cy="password"]').should('exist')
    cy.get('[data-cy="login-btn"]').should('exist')
  })
})
