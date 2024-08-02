/// <reference types="cypress" />

//const { faker } = require('@faker-js/faker');

describe('Cadastro de usuário', () => {
    it('deve cadastrar um novo usuário', function () {
        const name = "Leonardo Padilha"
        const email = "leonardo@samuraibs.com"
        const password = "pwd123"
        const msg = "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"

        cy.visit('/signup')
        cy.get('[placeholder^="Nome"]').type(name) // começa com
        cy.get('[placeholder$="email"]').type(email) // termina com
        cy.get('[placeholder*="senha"]').type(password) // contém

        cy.intercept('POST', '/users', {
            statusCode: 200
        }).as('postUser')

        cy.contains('button', 'Cadastrar').click()

        cy.wait('@postUser') // --> chamando o alias criado com o intercept

        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', msg)
/* 
        cy.wait(5000)
        cy.get('body') */
    })
})