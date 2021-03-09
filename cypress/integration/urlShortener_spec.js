describe('URL Shortener - on page load', () => {

  const baseUrl = 'http://localhost:3000'

  before(() => {
    cy.fixture('mockData.json')
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
    cy.get('form').find('input[type=text]').eq(0)
      .type('Bumble Bee Bums')
    cy.get('form input').eq(0).should('have.attr', 'value', 'Bumble Bee Bums')

    cy.get('form').find('input[type=text]').eq(1)
      .type('test input')
    cy.get('form input').eq(1).should('have.attr', 'value', 'test input')
  })
})

describe('URL Shortener - add new URL', () => {

  const baseUrl = 'http://localhost:3000'

  before(() => {
    cy.fixture('mockData.json')
      .then((mockUrls) => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
          statusCode: 200,
          body: mockUrls
        })
    })
    
    cy.fixture('mockDataAfterPost.json')
      .then((mockPost) => {
        cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
          statusCode: 200,
          body: mockPost
        })
      })

    cy.visit(baseUrl)
  })

  it ('Should be able to submit the form and see the new shortened URL', () => {
    cy.get('form').find('input[type=text]').eq(0)
      .type('Bumble Bee Bums')
    cy.get('form input').eq(0).should('have.attr', 'value', 'Bumble Bee Bums')

    cy.get('form').find('input[type=text]').eq(1)
      .type('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.reddit.com%2Fr%2Faww%2Fcomments%2Fhqhujs%2Fbehold_the_glory_of_bumblebee_butts%2F&psig=AOvVaw3vt_WBpzqvNzHGVub79PJB&ust=1615397393702000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjpwrDeo-8CFQAAAAAdAAAAABAD')
    cy.get('form input').eq(1).should('have.attr', 'value', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.reddit.com%2Fr%2Faww%2Fcomments%2Fhqhujs%2Fbehold_the_glory_of_bumblebee_butts%2F&psig=AOvVaw3vt_WBpzqvNzHGVub79PJB&ust=1615397393702000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjpwrDeo-8CFQAAAAAdAAAAABAD')
  
    cy.get('form button').click()

    cy.get('.App').find('.url').should('have.length', 2)

  })
})

describe('URL Shortener - Error Handling on page load', () => {

  const baseUrl = 'http://localhost:3000'

  before(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 404
    })

    cy.visit(baseUrl)
  })

  it ('Should see an error message', () => {
    cy.get('.App').find('p').should('contain', 'Cannot retrieve your shortened urls, please try again later.')
  })
})

describe('URL Shortener - Error Handling on bad post response', () => {

  const baseUrl = 'http://localhost:3000'

  before(() => {
    cy.fixture('mockData.json')
    .then((mockUrls) => {
      cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
        statusCode: 200,
        body: mockUrls
      })
    })

    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 404
    })

    cy.visit(baseUrl)
  })

  it ('Should see an error message after trying to submit a new url', () => {
    cy.get('form').find('input[type=text]').eq(0)
      .type('test title')

    cy.get('form').find('input[type=text]').eq(1)
      .type('test input')
    
    cy.get('form button').click()
    
    cy.get('.App').find('p').should('contain', 'Url shortening unsuccessful, please try again.')
  })
})

describe.only('URL Shortener - Error Handling on incomplete inputs', () => {

  const baseUrl = 'http://localhost:3000'

  before(() => {
    cy.fixture('mockData.json')
    .then((mockUrls) => {
      cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
        statusCode: 200,
        body: mockUrls
      })
    })

    cy.visit(baseUrl)
  })

  it ('Should see an error message after trying to submit the form without completing both fields', () => {
    cy.get('form').find('input[type=text]').eq(0)
      .type('test title')
    
    cy.get('form button').click()
    
    cy.get('.App').find('p').should('contain', 'Please include a title and url to your submission')
  })

  it ('Should remove error message and be able to submit after user starts typing in input', () => {
     cy.get('form').find('input[type=text]').eq(0)
      .type('test title')
    
    cy.get('form button').click()

     cy.get('form').find('input[type=text]').eq(1)
      .type('test url')

      cy.fixture('mockDataAfterPost.json')
      .then((mockPost) => {
        cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
          statusCode: 200,
          body: mockPost
        })
      })

    cy.get('form button').click()

  })
})