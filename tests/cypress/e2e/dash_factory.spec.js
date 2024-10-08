import dashPage from '../support/pages/dash'
import { customer, provider, appointment } from "../support/factories/dash"

describe('dashboard', function () {
    context('quando o cliente faz um agendamento no app mobile', function () {

        before(function() {
            cy.postUser(provider)
            cy.postUser(customer)
            
            cy.apiLogin(customer)
            cy.log('Conseguimos pegar o token ' + Cypress.env('apiToken'))

            cy.setProviderId(provider.email)
            cy.createAppointment(appointment.hour)
        })
        it('o mesmo deve ser exibido no dashboard', function() {
            const date = Cypress.env('appointmentDate')
            
            //cy.uiLogin(provider)
            cy.apiLogin(provider, true) // salvando token no local Storage quando os dados é do provider

            dashPage.calendarShouldBeVisible()
            dashPage.selectDay(date)
            dashPage.appointmentShouldBe(customer, appointment.hour)

            // screenshot apenas para esse cenário
            //cy.screenshot()

        })
    })
})

/*
Para executar apenas um arquivo via terminal
npx cypress run --spec endereco-do-arquivo
npx cypress run --spec endereco-do-arquivo --browser chrome
npx cypress run --spec endereco-do-arquivo --browser edge
npx cypress run --spec endereco-do-arquivo --browser firefox
*/