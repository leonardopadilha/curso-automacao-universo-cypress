/// <reference types="cypress" />
import signupPage from '../support/pages/signup'

//const { faker } = require('@faker-js/faker');

describe('Cadastro de usuário', () => {

    before(function() {
        cy.fixture('signup').then(function(signup) {
            this.success = signup.success
            this.email_dup = signup.email_dup
            this.email_inv = signup.email_inv
            this.short_password = signup.short_password
        })
    })

    context('quando o usuário é novato', function() {
        before(function() {
            cy.task('removeUser', this.success.email)
            .then(function(result) {
                console.log(result)
            })
        })

        it('deve cadastrar com sucesso', function () {        
            const expectedText = "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"

            signupPage.go()
            signupPage.form(this.success)
            signupPage.submit()
            signupPage.toast.shouldHaveText(expectedText)
    /* 
            cy.wait(5000)
            cy.get('body') */
        })
    })

    context('quando o email já existe', function() {
        before(function() {
            cy.postUser(this.email_dup)
        })

        it('não deve cadastrar o usuário', function () {
            const expectedText = "Email já cadastrado para outro usuário."

            signupPage.go()
            signupPage.form(this.email_dup)
            signupPage.submit()
            signupPage.toast.shouldHaveText(expectedText)
        })
    })

    context('quando o email é incorreto', function() {
        it('deve exibir mensagem de alerta', function() {
            const expectedText = "Informe um email válido"

            signupPage.go()
            signupPage.form(this.email_inv)
            signupPage.submit()
            signupPage.alert.haveText(expectedText)

        })
    })

    context('quando a senha é muito curta', function() {
        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

        passwords.forEach(function(p) {
            it(`não deve cadastrar com a senha: ${p}`, function() {
                this.short_password.password = p

                signupPage.go()
                signupPage.form(this.short_password)
                signupPage.submit()
            })
        })

        afterEach(function() {
            signupPage.alert.haveText('Pelo menos 6 caracteres')
        })
    })

    context('quando não preencho nenhum dos campos', function() {
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        beforeEach(function() {
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function(alert) {
            it(`deve exibir ${alert.toLowerCase()}`, function() {
                signupPage.alert.haveText(alert)
            })
        })
    })
})