import { el } from './elements'
import toast from '../../components/toast'

class SignupPage {
    constructor() {
        this.toast = toast
    }

    go() {
        cy.visit('/signup')
    }

    form(user) {
        cy.get(el.name).type(user.name) // começa com...
        cy.get(el.email).type(user.email) // termina com...
        cy.get(el.password).type(user.password) // possui em qualquer parte da frase
    }

    submit() {
        cy.contains(el.signupbutton).click()
    }

    alertHaveText(expectedText) {
        cy.contains('.alert-error', expectedText)
        .should('be.visible')
    }


}

export default new SignupPage()