Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
      firstName: 'Ana',
      lastName: 'Rodrigues',
      email: 'teste@email.com.br',
      telefone: '8488888888',
      text: 'Texto inserido com valor padrão já definido no Command.'
    }) => {

    cy.get('#firstName').type(data.firstName)
    cy.get('[name="lastName"]').type(data.lastName)
    cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type(data.email)
    cy.get(':nth-child(2) > [name="phone"]').type(data.telefone)
    cy.get('#product').select(1)
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
    cy.get('[name="open-text-area"]').type(data.text, {delay: 15})

    cy.get('button[type="submit"]').click()

})