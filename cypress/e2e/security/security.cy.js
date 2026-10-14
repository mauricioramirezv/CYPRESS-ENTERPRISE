describe('Comprobaciones básicas de rechazo y cabeceras', () => {
  it('envía las cabeceras esperadas en la API', () => {
    cy.request('/api/users').then(({ headers }) => {
      expect(headers['x-content-type-options']).to.eq('nosniff');
      expect(headers['referrer-policy']).to.eq('no-referrer');
      expect(headers['cache-control']).to.eq('no-store');
    });
  });
  [{ username: 'invalido', password: 'admin123' }, { username: 'admin', password: 'incorrecta' }].forEach(credentials => {
    it(`rechaza las credenciales: ${credentials.username} / contraseña de prueba`, () => {
      cy.visit('/');
      cy.intercept('POST', '/api/login').as('login');
      cy.get('[data-cy=username]').type(credentials.username);
      cy.get('[data-cy=password]').type(credentials.password, { log: false });
      cy.get('[data-cy=login-btn]').click();
      cy.wait('@login').its('response.statusCode').should('eq', 401);
      cy.get('[data-cy=login-message]').should('have.text', 'Credenciales inválidas').and('have.attr', 'role', 'alert');
      cy.get('[data-cy=dashboard]').should('not.exist');
    });
  });
});
