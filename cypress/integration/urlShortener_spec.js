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
  })

  it ('Should be able to view the page title and the existing shortened URLs', () => {
    cy.get('.App').find('h1').should('contain', 'URL Shortener')
      .get('.App').find('.url').should('have.length', 1)
      .get('.App').find('.url').eq(0).find('h3').should('contain', 'Awesome photo of a bridge')
      .get('.App').find('.url').eq(0).find('a').should('contain', 'http://localhost:3001/useshorturl/1')
  })

  it ('Should be able to view the Form with the proper inputs', () => {
    cy.get('form').find('input[type=text]').should('have.length', 2)
      .get('form').find('button').should('contain', 'Shorten Please!')
  })

  it ('Should be able to see what user has typed into the form inputs', () => {
    
  })
})