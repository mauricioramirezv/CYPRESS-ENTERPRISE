describe('Regresión: ingreso y cierre de sesión', () => {
  beforeEach(() => cy.visit('/'));
  it('ingresa con credenciales válidas y comprueba la respuesta real', () => {
    cy.intercept('POST', '/api/login').as('login');
    cy.get('[data-cy=username]').type('admin');
    cy.get('[data-cy=password]').type('admin123', { log: false });
    cy.get('[data-cy=login-btn]').click();
    cy.wait('@login').its('response.statusCode').should('eq', 200);
    cy.get('[data-cy=dashboard]').should('be.visible');
    cy.get('[data-cy=success-message]').should('have.text', 'Inicio de sesión exitoso');
    cy.get('[data-cy=welcome]').should('have.text', 'Bienvenido, admin');
  });
  it('cierra la sesión y vuelve al formulario', () => {
    cy.get('[data-cy=username]').type('admin');
    cy.get('[data-cy=password]').type('admin123', { log: false });
    cy.get('[data-cy=login-btn]').click();
    cy.get('[data-cy=logout-btn]').click();
    cy.get('[data-cy=username]').should('be.visible').and('have.value', '');
    cy.get('[data-cy=dashboard]').should('not.exist');
  });
});
