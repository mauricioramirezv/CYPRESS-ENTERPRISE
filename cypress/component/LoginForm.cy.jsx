import React from 'react';
import LoginForm from '../../src/components/LoginForm';
import '../../src/styles.css';
describe('LoginForm aislado', () => {
  it('muestra los controles', () => {
    cy.mount(<LoginForm />);
    cy.get('[data-cy=username]').should('be.visible');
    cy.get('[data-cy=password]').should('have.attr', 'type', 'password');
    cy.get('[data-cy=login-btn]').should('have.text', 'Ingresar');
  });
  it('valida los campos vacíos', () => {
    cy.mount(<LoginForm />);
    cy.get('[data-cy=login-btn]').click();
    cy.get('[data-cy=login-message]').should('have.text', 'Complete usuario y contraseña');
  });
  [true, false].forEach(valid => {
    it(valid ? 'notifica un ingreso correcto' : 'muestra el rechazo de la API', () => {
      const user = { username: 'admin' };
      cy.intercept('POST', '/api/login', { statusCode: valid ? 200 : 401, body: valid ? { user, message: 'Inicio de sesión exitoso' } : { error: 'Credenciales inválidas' } }).as('login');
      cy.mount(<LoginForm onSuccess={cy.stub().as('success')} />);
      cy.get('[data-cy=username]').type('admin');
      cy.get('[data-cy=password]').type(valid ? 'admin123' : 'incorrecta', { log: false });
      cy.get('[data-cy=login-btn]').click();
      cy.wait('@login');
      cy.get('[data-cy=login-message]').should('have.text', valid ? 'Inicio de sesión exitoso' : 'Credenciales inválidas');
      if (valid) cy.get('@success').should('have.been.calledOnceWith', user);
      else cy.get('@success').should('not.have.been.called');
    });
  });
});
