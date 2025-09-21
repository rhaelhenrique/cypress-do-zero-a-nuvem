describe('Central de Atendimento ao Cliente TAT', () => {
  
  before(() => {
    cy.visit('./src/index.html')

    //cy.visit('https://duckduckgo.com')
  })

  it('Preenche os campos corretamente e envia', () =>{

    const longText = Cypress._.repeat('Repetindo texto ', 10)

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    cy.get('#firstName').type('Rhael')
    cy.get('[name="lastName"]').type('Rodrigues')
    cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type('email@teste.com.br')
    cy.get(':nth-child(2) > [name="phone"]').type('8499999999')
    cy.get('#product').select('Cursos')
    cy.get('[name="open-text-area"]').type(longText, {delay: 15})

    //cy.get('button[type="submit"]').click()

    cy.contains('button', 'Enviar').click() //Nova forma de encontrar o botão

    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter', () =>{

    const longText = Cypress._.repeat('Repetindo texto ', 10)

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    cy.get('#firstName').type('Rhael')
    cy.get('[name="lastName"]').type('Rodrigues')
    cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type('emailteste.com.br')
    cy.get(':nth-child(2) > [name="phone"]').type('8499999999')
    cy.get('#product').select(1)
    cy.get('[name="open-text-area"]').type(longText, {delay: 15})

    //cy.get('button[type="submit"]').click()

    cy.contains('button', 'Enviar').click() //Nova forma de encontrar o botão

    cy.get('.error').should('be.visible')
  })

  it('Testando o inser de texto no campo telefone', () =>{

    const longText = Cypress._.repeat('Repetindo texto ', 10)

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    cy.get('#firstName').type('Rhael')
    cy.get('[name="lastName"]').type('Rodrigues')
    cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type('email@teste.com.br')
    cy.get(':nth-child(2) > [name="phone"]').type('abcdefgh')
    cy.get('#product').select(1)
    cy.get('[name="open-text-area"]').type(longText, {delay: 15})

    //cy.get('button[type="submit"]').click()

    cy.contains('button', 'Enviar').click() //Nova forma de encontrar o botão

    cy.get(':nth-child(2) > [name="phone"]').should('be.empty')
  })

  it('Telefone como campo obrigatório, mensagem de erro.', () =>{

    const longText = Cypress._.repeat('Repetindo texto ', 10)

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    cy.get('#firstName').type('Rhael')
    cy.get('[name="lastName"]').type('Rodrigues')
    cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type('email@teste.com.br')
    cy.get(':nth-child(2) > [name="phone"]').type('abcdefgh')
    cy.get('#check > [name="phone"]').check()//poderia usar o .click() também
    cy.get('#product').select(1)
    cy.get('[name="open-text-area"]').type(longText, {delay: 15})
    cy.get('[name="open-text-area"]').clear() //limpa o campo
    cy.get('[name="open-text-area"]').type('Novo Texto.')

    //cy.get('button[type="submit"]').click()

    cy.contains('button', 'Enviar').click() //Nova forma de encontrar o botão

    cy.get('.error').should('be.visible')
  })

    it('Telefone como campo obrigatório, mensagem de erro.', () =>{

    const longText = Cypress._.repeat('Repetindo texto ', 10)

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    cy.get('#firstName').type('Rhael')
    cy.get('[name="lastName"]').type('Rodrigues')
    cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type('email@teste.com.br')
    cy.get(':nth-child(2) > [name="phone"]').type('abcdefgh')
    cy.get('#check > [name="phone"]').check()//poderia usar o .click() também
    cy.get('#product').select(1)
    cy.get('[name="open-text-area"]').type(longText, {delay: 15})
    cy.get('[name="open-text-area"]').clear() //limpa o campo
    cy.get('[name="open-text-area"]').type('Novo Texto.')
    cy.get('[name="open-text-area"]').should('have.value', 'Novo Texto.')

    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('Envia o formulário com sucesso usando um comando customizado', () =>{

    const data = {
      firstName: 'Rhael',
      lastName: 'Rodrigues',
      email: 'teste@email.com.br',
      telefone: '8499999999',
      text: 'Texto inserido no data.'
    }

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
  })

  it('Envia o formulário com sucesso usando um comando customizado com valores padrão!', () =>{

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })


  it('Testando uma busca com autocomplete e seleção do primeiro resultado.', () => {

    cy.get('input[type="text"]')
      .as('searchField')
      .should('be.visible')
    
    cy.get('@searchField')
      .type('Cypress{downarrow}{enter}', {delay: 100})

  })

  it('Testando o checked nas opções de Radio Button', () => {

    cy.get('input[type="radio"][value="ajuda"]').check().should('be.checked')
    cy.get('input[type="radio"][value="elogio"]').check().should('be.checked')
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
    cy.get('input[type="radio"][value="ajuda"]').check().should('be.checked')
    cy.get('input[type="radio"][value="elogio"]').check().should('be.checked')
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')

    //Neste ponto eu faço o check nos checkbox e depois desmarco o segundo, usando o uncheck
    cy.get('input[type="checkbox"][name="email"]').check().should('be.checked')
    cy.get('input[type="checkbox"][name="phone"]').check().should('be.checked')
    cy.get('input[type="checkbox"][name="phone"]').uncheck().should('be.not.checked')

    //Selecionando um arquivo da pasta fixtures
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Testnado um input de arquivo, sem Drag and Drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Selecionando um arquivo com alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]').selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })

  })

  it('Identifica que o link abre em uma nova aba "target=_blank"', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it.only('Acessar o link sem abrir em outra Aba, usando o INVOKE', () => {
      cy.contains('a', 'Política de Privacidade')
        .invoke('removeAttr', 'target')
        .click()
      cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')

  })

})
