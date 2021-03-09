describe('URL Shortener', () => {

  const baseUrl = 'http://localhost:3000'

  before(() => {
    cy
    .fixture('mockData.json')
    .then((mockUrls) => {
      cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
        statusCode: 200,
        body: mockUrls
      })
    })
    
    cy.visit(baseUrl)
  });

  it ('Should show a loading status while fetching movie info', () => {
    cy.get('.App').should('be.visible')
  });
});
