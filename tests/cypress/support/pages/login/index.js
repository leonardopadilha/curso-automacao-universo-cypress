class LoginPage {
    go() {
        cy.visit('/')
    }

    form(user) {
        cy.get('[placeholder$="mail"]').type(user.email)
        cy.get('[placeholder="Senha"]').type(user.password)
    }

    submit() {
        cy.contains('[type=submit]', 'Entrar').click()
    }
}

export default new LoginPage()