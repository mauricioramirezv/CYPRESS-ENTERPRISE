describe('Formulario: validación y teclado', () => {
  beforeEach(() => cy.visit('/'));
  it('informa que faltan campos', () => {
    cy.get('[data-cy=login-btn]').click();
    cy.get('[data-cy=login-message]').should('have.text', 'Complete usuario y contraseña');
    cy.get('[data-cy=dashboard]').should('not.exist');
  });
  it('permite enviar el formulario con Enter', () => {
    cy.get('[data-cy=username]').type('admin');
    cy.get('[data-cy=password]').type('admin123{enter}', { log: false });
    cy.get('[data-cy=dashboard]').should('be.visible');
  });
});
