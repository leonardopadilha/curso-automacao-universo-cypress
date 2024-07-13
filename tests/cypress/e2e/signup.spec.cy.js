/// <reference types="cypress" />

//const { faker } = require('@faker-js/faker');

describe('Cadastro de usuário', () => {

    const user = {
        name: "Leonardo Padilha",
        email: "leonardo@samuraibs.com",
        password: "pwd123"
    }

    it('deve cadastrar um novo usuário', function () {        
        const msg = "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"

        cy.task('removeUser', user.email)
            .then(function(result) {
                console.log(result)
            })

        cy.visit('/signup')
        cy.get('[placeholder="Nome"]').type(user.name)
        cy.get('[placeholder="E-mail"]').type(user.email)
        cy.get('[placeholder="Senha"]').type(user.password)

        cy.contains('button', 'Cadastrar').click()

        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', msg)
/* 
        cy.wait(5000)
        cy.get('body') */
    })

    it('deve exibir email já cadastrado', function () {
        const msg = "Email já cadastrado para outro usuário."

        cy.visit('/signup')
        cy.get('[placeholder="Nome"]').type(user.name)
        cy.get('[placeholder="E-mail"]').type(user.email)
        cy.get('[placeholder="Senha"]').type(user.password)

        cy.contains('button', 'Cadastrar').click()

        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', msg)
/* 
        cy.wait(5000)
        cy.get('body') */
    })
})