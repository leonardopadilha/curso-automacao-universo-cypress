import { el } from './elements'
import header from '../../components/header'

class DashPage {
    constructor() {
        this.header = header
    }

    calendarShouldBeVisible() {
        cy.get(el.calendar, { timeout: 7000 })
            .should('be.visible')
    }

    selectDay(appointmentDate) {
        let today = new Date()
        let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

        //cy.log(today.toString())
        if (today.getDate() === lastDayOfMonth.getDate()) {
            cy.get(el.nextMonthButton)
                .should('be.visible')
                .click()

            // garante que houve troca de calendário
            let montName
            switch(lastDayOfMonth.getDate()) {
                case 0:
                    montName = 'Janeiro'
                break;
                case 0:
                    montName = 'Janeiro'
                break;
                case 1:
                    montName = 'Fevereiro'
                break;
                case 2:
                    montName = 'Março'
                break;
                case 3:
                    montName = 'Abril'
                break;
                case 4:
                    montName = 'Maio'
                break;
                case 5:
                    montName = 'Junho'
                break;
                case 6:
                    montName = 'Julho'
                break;
                case 7:
                    montName = 'Agosto'
                break;
                case 8:
                    montName = 'Setembro'
                break;
                case 9:
                    montName = 'Outubro'
                break;
                case 10:
                    montName = 'Novembro'
                break;
                case 11:
                    montName = 'Dezembro'
                break;
            }

            cy.contains(el.monthYearName, montName)
                .should('be.visible')
        }

        const target = new RegExp('^' + appointmentDate.getDate() + '$', 'g')

        cy.contains(el.boxDay, target)
            .click({ force: true })
    }

    appointmentShouldBe(customer, hour) {
        cy.contains('div', customer.name)
            .should('be.visible')
            .parent()
            .contains(el.boxHour, hour)
            .should('be.visible')
    }
}

export default new DashPage()