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


    it('Test for addition', () => {
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
            .click()
            .should('have.css', 'background-color', 'rgb(239, 239, 239)')
    })


    it('Try some illegal operation', () => {
        cy.contains('*').click() // shouldn't display

        cy.get('.current-operand').should('have.text', '')

        cy.contains('+').click()

        cy.get('.current-operand').should('have.text', '+')

        cy.contains('9').click()
        cy.contains('8').click()

        cy.get('.current-operand').should('have.text', '+98')
    })


    it('Test for subtraction', () => {
        cy.contains('1').click()
        cy.contains('5').click()

        cy.get('.current-operand').should('have.text', '15')

        cy.contains('-').click()

        cy.get('.current-operand').should('have.text', '15-')

        cy.contains('3').click()
        cy.contains('.').click()
        cy.contains('2').click()

        cy.get('.current-operand').should('have.text', '15-3.2')

        cy.contains('=').click()

        cy.get('.current-operand').should('have.text', '11.8')
    })

    it('Test for division', () => {
        cy.contains('7').click()
        cy.contains('8').click()

        cy.get('.current-operand').should('have.text', '78')

        cy.contains('÷').click()

        cy.get('.current-operand').should('have.text', '78÷')

        cy.contains('3').click()

        cy.get('.current-operand').should('have.text', '78÷3')

        cy.contains('=').click()

        cy.get('.current-operand').should('have.text', '26')
    })

    it('Test for multiplication', () => {
        cy.contains('1').click()
        cy.contains('8').click()

        cy.get('.current-operand').should('have.text', '18')

        cy.contains('*').click()

        cy.get('.current-operand').should('have.text', '18*')

        cy.contains('6').click()

        cy.get('.current-operand').should('have.text', '18*6')

        cy.contains('=').click()

        cy.get('.current-operand').should('have.text', '108')
    })
})