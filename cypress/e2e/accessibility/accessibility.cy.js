describe('Accesibilidad automática con axe', () => {
  it('comprueba el formulario inicial', () => {
    cy.visit('/');
    cy.injectAxe();
    cy.checkA11y(null, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } });
  });
  it('comprueba el panel después del ingreso', () => {
    cy.visit('/');
    cy.get('[data-cy=username]').type('admin');
    cy.get('[data-cy=password]').type('admin123', { log: false });
    cy.get('[data-cy=login-btn]').click();
    cy.get('[data-cy=dashboard]').should('be.visible');
    cy.injectAxe();
    cy.checkA11y(null, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } });
  });
});
