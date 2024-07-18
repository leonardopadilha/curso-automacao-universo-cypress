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
})