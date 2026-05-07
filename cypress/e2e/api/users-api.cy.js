describe('API Testing', () => {

  it('GET users', () => {

    cy.request('https://jsonplaceholder.typicode.com/users')
      .then((response) => {

        expect(response.status).to.eq(200)
        expect(response.body.length).to.be.greaterThan(0)
      })
  })

  it('POST user', () => {

    cy.request({
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/users',
      body: {
        name: 'Mauricio',
        email: 'mauricio@test.com'
      }
    }).then((response) => {

      expect(response.status).to.eq(201)
      expect(response.body.name).to.eq('Mauricio')
    })
  })
})
