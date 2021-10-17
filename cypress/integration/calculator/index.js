/**
 * Arrange - set up inital app state
 * - visit a web page
 * - query for an element
 * 
 * Act - take an action
 * - interact with an element
 * 
 * Assert - make an assertion
 * - make an assertion about page content
 */

describe('Test display/clicks', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8088')
    })

    it('Open the calculator app and display a reponsive calulator', () => {


        cy.contains('5').click()

        cy.get('.current-operand').should('have.text', '5')

        cy.contains('+').click()

        cy.get('.current-operand').should('have.text', '5+')

        cy.contains('9').click()
        cy.contains('8').click()

        cy.get('.current-operand').should('have.text', '5+98')
    })


    it('Open the calculator app and use calulator', () => {
        cy.contains('5').click()

        cy.get('.current-operand').should('have.text', '5')

        cy.contains('+').click()

        cy.get('.current-operand').should('have.text', '5+')

        cy.contains('9').click()
        cy.contains('8').click()

        cy.get('.current-operand').should('have.text', '5+98')

        cy.contains('=').click()

        cy.get('.current-operand').should('have.text', '103')
    })

    it('Responsiveness - focus on a number button', () => {
        cy.get('.calculator-grid > button:nth-child(5)')
            .focus()
            .should('have.css', 'background-color', 'rgb(239, 239, 239)')
    })


    it('Open the calculator app and try some illegal operation', () => {
        cy.contains('*').click() // shouldn't display

        cy.get('.current-operand').should('have.text', '')

        cy.contains('+').click() // shouldn't display too

        cy.get('.current-operand').should('have.text', '')

        cy.contains('9').click()
        cy.contains('8').click()

        cy.get('.current-operand').should('have.text', '98')

        cy.contains('+').click()

        cy.get('.current-operand').should('have.text', '98+')
    })
})