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


        cy.get('[data-number="5"]').click()

        cy.get('.current-operand').should('have.text', '5')

        cy.get('[data-operation="+"]').click()

        cy.get('.current-operand').should('have.text', '5+')

        cy.get('[data-number="9"]').click()
        cy.get('[data-number="8"]').click()

        cy.get('.current-operand').should('have.text', '5+98')
    })


    it('Test for addition', () => {
        cy.get('[data-number="5"]').click()

        cy.get('.current-operand').should('have.text', '5')

        cy.get('[data-operation="+"]').click()

        cy.get('.current-operand').should('have.text', '5+')

        cy.get('[data-number="9"]').click()
        cy.get('[data-number="8"]').click()

        cy.get('.current-operand').should('have.text', '5+98')

        cy.contains('=').click()

        cy.get('.current-operand').should('have.text', '103')
    })

    it('Responsiveness - focus on a number button', () => {
        cy.get('[data-number="1"]')
            .click()
            .should('have.css', 'background-color', 'rgb(239, 239, 239)')
    })


    it('Try some illegal operation', () => {
        cy.get('[data-operation="*"]').click() // shouldn't display

        cy.get('.current-operand').should('have.text', '')

        cy.get('[data-operation="+"]').click()

        cy.get('.current-operand').should('have.text', '+')

        cy.get('[data-number="9"]').click()
        cy.get('[data-number="8"]').click()

        cy.get('.current-operand').should('have.text', '+98')
    })


    it('Test for subtraction with decimal', () => {
        cy.get('[data-number="1"]').click()
        cy.get('[data-number="5"]').click()

        cy.get('.current-operand').should('have.text', '15')

        cy.get('[data-operation="-"]').click()

        cy.get('.current-operand').should('have.text', '15-')

        cy.get('[data-number="3"]').click()
        cy.contains('.').click()
        cy.get('[data-number="2"]').click()

        cy.get('.current-operand').should('have.text', '15-3.2')

        cy.contains('=').click()

        cy.get('.current-operand').should('have.text', '11.8')
    })

    it('Test for division', () => {
        cy.get('[data-number="7"]').click()
        cy.get('[data-number="8"]').click()

        cy.get('.current-operand').should('have.text', '78')

        cy.get('[data-operation="÷"]').click()

        cy.get('.current-operand').should('have.text', '78÷')

        cy.get('[data-number="3"]').click()

        cy.get('.current-operand').should('have.text', '78÷3')

        cy.contains('=').click()

        cy.get('.current-operand').should('have.text', '26')
    })

    it('Test for multiplication', () => {
        cy.get('[data-number="1"]').click()
        cy.get('[data-number="8"]').click()

        cy.get('.current-operand').should('have.text', '18')

        cy.get('[data-operation="*"]').click()

        cy.get('.current-operand').should('have.text', '18*')

        cy.get('[data-number="6"]').click()

        cy.get('.current-operand').should('have.text', '18*6')

        cy.contains('=').click()

        cy.get('.current-operand').should('have.text', '108')
    })


    it('Test for division with decimal', () => {
        cy.get('[data-number="9"]').click()
        cy.get('[data-number="."]').click()
        cy.get('[data-number="2"]').click()

        cy.get('.current-operand').should('have.text', '9.2')

        cy.get('[data-operation="÷"]').click()

        cy.get('.current-operand').should('have.text', '9.2÷')

        cy.get('[data-number="7"]').click()

        cy.get('.current-operand').should('have.text', '9.2÷7')

        cy.contains('=').click()

        cy.get('.current-operand').should('have.text', '1.3142857142857143')
    })


    it('Test for all clear', () => {
        cy.get('[data-number="9"]').click()
        cy.get('[data-number="4"]').click()
        cy.get('[data-number="2"]').click()

        cy.get('.current-operand').should('have.text', '942')

        cy.get('[data-all-clear]').click()

        cy.get('.current-operand').should('have.text', '')
    })


    it('Test for delete', () => {
        cy.get('[data-number="2"]').click()
        cy.get('[data-number="8"]').click()
        cy.get('[data-number="1"]').click()

        cy.get('.current-operand').should('have.text', '281')

        cy.get('[data-delete]').click()

        cy.get('.current-operand').should('have.text', '28')
    })
})