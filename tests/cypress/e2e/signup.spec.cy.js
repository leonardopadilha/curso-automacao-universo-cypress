/// <reference types="cypress" />
import signupPage from '../support/pages/signup'

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
            const expectedText = "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText(expectedText)
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
            const expectedText = "Email já cadastrado para outro usuário."

            signupPage.go()
            signupPage.form(userCadastrado)
            signupPage.submit()
            signupPage.toast.shouldHaveText(expectedText)
        })
    })

    context('quando o email é incorreto', function() {
        const user = {
            name: "Elizabeth Olsen",
            email: "liza.yahoo.com",
            password: "pwd123"
        }

        it('deve exibir mensagem de alerta', function() {
            const expectedText = "Informe um email válido"

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText(expectedText)

        })
    })
})