// Modelo escrito manualmente: sirve como referencia para comparar una grabación de Studio.
describe('Flujo de referencia para Cypress Studio', () => {
  it('ingresa y verifica el saludo', () => {
    cy.visit('/');
    cy.get('[data-cy=username]').type('admin');
    cy.get('[data-cy=password]').type('admin123', { log: false });
    cy.get('[data-cy=login-btn]').click();
    cy.get('[data-cy=welcome]').should('have.text', 'Bienvenido, admin');
  });
});
