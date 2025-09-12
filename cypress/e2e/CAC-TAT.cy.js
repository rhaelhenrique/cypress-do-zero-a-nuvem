describe('Central de Atendimento ao Cliente TAT', () => {
  
  before(() => {
    cy.visit('./src/index.html')
  })


  it('Preenche os campos e envia', () =>{
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    cy.get('#firstName').type('Rhael')
    cy.get('[name="lastName"]').type('Rodrigues')
    cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type('email@teste.com.br')
    cy.get(':nth-child(2) > [name="phone"]').type('8499999999')
    cy.get('#product').select(1)
    cy.get('[name="open-text-area"]').type('Testando insert')

    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

})
