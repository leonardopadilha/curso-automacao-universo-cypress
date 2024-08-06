import { el } from './elements'
import toast from '../../components/toast'
import alert from '../../components/alert'

class SignupPage {
    constructor() {
        this.toast = toast
        this.alert = alert
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
}

export default new SignupPage()