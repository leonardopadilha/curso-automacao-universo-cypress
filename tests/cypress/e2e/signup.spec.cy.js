/// <reference types="cypress" />

//const { faker } = require('@faker-js/faker');

describe('Cadastro de usuário', () => {

    context('quando o usuário é novato', function() {
        const user = {
            name: "Leonardo Padilha",
            email: "leonardo@samuraibs.com",
            password: "pwd123"
        }

        before(function() {
            cy.task('removeUser', user.email)
            .then(function(result) {
                console.log(result)
            })
        })

        it('deve cadastrar com sucesso', function () {        
            const msg = "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"
    
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

    context('quando o email já existe', function() {
        const userCadastrado = {
            name: 'João Lucas',
            email: 'joao@samuraibs.com',
            password: 'pwd123',
            is_provider:true
        }

        before(function() {
            cy.task('removeUser', userCadastrado.email)
            .then(function(result) {
                console.log(result)
            })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                userCadastrado,
                //failOnStatusCode: false
            ).then(function(response) {
                expect(response.status).to.eq(200)
            })
        })

        it('não deve cadastrar o usuário', function () {

            const msg = "Email já cadastrado para outro usuário."
    
            cy.visit('/signup')
            cy.get('[placeholder="Nome"]').type(userCadastrado.name)
            cy.get('[placeholder="E-mail"]').type(userCadastrado.email)
            cy.get('[placeholder="Senha"]').type(userCadastrado.password)
    
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
})