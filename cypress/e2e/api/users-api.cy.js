describe('API local de usuarios', () => {
  beforeEach(() => cy.request('POST', '/api/reset', {}));
  it('consulta los usuarios iniciales', () => {
    cy.request('/api/users').then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body).to.have.length(2);
      expect(body[0]).to.include({ name: 'Ana', email: 'ana@example.com' });
    });
  });
  it('crea un usuario y comprueba que se conserva en memoria', () => {
    cy.request('POST', '/api/users', { name: 'Carla', email: 'carla@example.com' }).then(({ status, body }) => {
      expect(status).to.eq(201);
      expect(body).to.include({ name: 'Carla', email: 'carla@example.com' });
      expect(body.id).to.be.a('number');
      cy.request('/api/users').its('body').should('deep.include', body);
    });
  });
  it('rechaza un correo inválido sin crear un usuario', () => {
    cy.request({ method: 'POST', url: '/api/users', body: { name: 'Carla', email: 'incorrecto' }, failOnStatusCode: false }).then(({ status, body }) => {
      expect(status).to.eq(400);
      expect(body.error).to.eq('Nombre y correo válidos son obligatorios');
    });
    cy.request('/api/users').its('body').should('have.length', 2);
  });
});
