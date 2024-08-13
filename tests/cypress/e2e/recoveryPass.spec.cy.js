/// <reference types="cypress" />
import forgotPass from "../support/pages/forgotPass";
import rpPage from "../support/pages/resetPass"

describe('resgate de senha', function() {
    before(function() {
        cy.fixture('recovery').then(function(recovery) {
            this.data = recovery
        })
    });

    contexto('quando o usuário esquece a senha', function() {
        before(function() {
            cy.postUser(this.data)
        })

        it('deve poder resgatar por email', function() {
            forgotPass.go()
            forgotPass.form(this.data.email)
            forgotPass.submit()

            const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
            forgotPass.toast.shouldHaveText(message)
        })
    })

    contexto('quando o usuário solicita o resgate', function() {
        before(function() {
            cy.postUser(this.data)
            cy.recoveryPass(this.data.email)
        })

        it('deve poder cadastrar uma nova senha', function() {
            const token = Cypress.env('recoveryToken')
            rpPage.go(token)
            rpPage.form('abc123', 'abc123')
            rpPage.submit()

            const message = 'Agora você já pode logar com a sua nova senha secreta.'
            rpPage.toast.shouldHaveText(message)
        })
    })
})