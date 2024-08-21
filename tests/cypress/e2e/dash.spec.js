import loginPage from '../support/pages/login' 
import dashPage from '../support/pages/dash'

describe('dashboard', function () {
    context('quando o cliente faz um agendamento no app mobile', function () {
        const data = {
            customer: {
                name: 'Nikki Sixx',
                email: 'sixx@motleycrue.com',
                is_provider: false
            },
            provider: {
                name: 'Ramon Valdes',
                email: 'ramon@televisa.com',
                is_provider: true
            },
            appointmentHour: '14:00'
        }

        before(function() {
            cy.postUser(data.provider)
            cy.postUser(data.customer)
            
            cy.apiLogin(data.customer)
            cy.log('Conseguimos pegar o token ' + Cypress.env('apiToken'))

            cy.setProviderId(data.provider.email)
            cy.createAppointment(data.appointmentHour)
        })
        it('o mesmo deve ser exibido no dashboard', function() {
            loginPage.go()
            loginPage.form(data.provider)
            loginPage.submit()

            const day = Cypress.env('appointmentDay')
            dashPage.calendarShouldBeVisible(day)
            dashPage.appointmentShouldBe(data.customer, data.appointmentHour)

        })
    })
})

import moment from 'moment'

Cypress.Commands.add('createAppointment', function(hour) {
    let now = new Date()
    now.setDate(now.getDate() + 1)
    const date = moment(now).format('YYYY-MM-DD ' + hour + ":00")

    Cypress.env('appointmentDay', now.getDate())

    const payload = {
        provider_id: Cypress.env('providerId'),
        date: date
    }

    cy.request({
        method: 'POST',
        url: 'https://localhost:3333/appointments',
        body: payload,
        headers: {
            authorization: 'Bearer ' + Cypress.env('apiToken')
        }
    }).then(function(response) {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('setProviderId', function(providerEmail) {
    cy.request({
        method: 'GET',
        url: 'http:localhost:3333/providers',
        Headers: {
            authorization: 'Bearer ' + Cypress.env('apiToken'),
        }
    }).then(function(response) {
        expect(response.status).to.eq(200)

        const providerList = response.body
        providerList.forEach(function(provider) {
            if (provider.email === providerEmail) {
                Cypress.env('providerId', provider.id)
            }
        })
    })
})

Cypress.Commands.add('apiLogin', function(user) {
    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: 'POST',
        url: 'https://localhost:3333/sessions',
        body: payload
    }).then(function(response) {
        expect(response.status).to.eq(200)
        Cypress.env('apiToken', response.body.token)
    })
})