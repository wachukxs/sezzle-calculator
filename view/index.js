/**
 * handle the floating point issue with js. how 0.1 + 0.2 != 0.3
 * 
 * Use solid principles.
 * Find a good design principle
 * 
 * Maybe turn to a react app
 * 
 * Use mad UI/UX
 * 
 * 1 + 6, then press =, then press 5 ...nah
 * 
 * change variable names, and modularize (code split)
 * 
 * start with a negative sign eg -4+3-23
 */


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const arithmeticOperations = new Set(['÷', '-', '+', '*'])

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement

        /**
         * As soon as we create the calculator, we should call the this.clear function because we have to reset the inputs
         * 
         * WHY?
         * 
         * 
         * [-|\+]?\d+\*\d+
         * 
         * we should also allow for -3 * -3 : TODO later
         */
        this.clear()
    }

    multiplicationRegEx = /(\d*\.*\d+\*\d*\.*\d+)/g
    additionRegEx = /(\d*\.*\d+\+\d*\.*\d+)/g // /([-|\+]?\d*\.*\d+\+\d*\.*\d+)/g // todo: support prepending -
    subtractionRegEx = /(\d*\.*\d+-\d*\.*\d+)/g // /([-|\+]?\d*\.*\d+-\d*\.*\d+)/g // todo: support prepending +
    divisionRegEx = /(\d*\.*\d+÷\d*\.*\d+)/g

    /**
     * delete all the displayed values. set this.currentOperand to an empty string if/since the values on the output are removed.
     * do the same for the previous operand. change this.operation to be undefined.
     */
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }


    /**
     * needs work
     * 1. rename to appendString or sth
     * @param {*} number 
     * @returns void - it appends to the currentOperand
     */
    appendNumber(number) {
        console.log(`number/operation to append ${number}`, `the current operand ${this.currentOperand}`);
        // if (number === '.' && this.currentOperand.includes('.')) return
        // can't append an operation if the last click was also an operation.
        if (
            (arithmeticOperations.has(number) && arithmeticOperations.has(this.currentOperand.toString().slice(-1)))
            ||
            (this.currentOperand == '' && arithmeticOperations.has(number)) // can't start with operation
            ) {
            console.log('nope'); // show an alert or message or something
            return
        }
        console.log(`appending ${number.toString()} to ${this.currentOperand.toString()}`);
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    /**
     * controls what will happen anytime a user clicks on any operation button
     * @param {*} operation 
     * @returns 
     */
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }



    /**
     * takes the values inside your calculator and displays the result
     * 
     * this will contain our logic of how to solve the operand with BODMAS
     * @returns final value
     */
    compute() {
        
        // use regex to replace appropriately

        // split according to BODMAS
        
        if (this.currentOperand.match(this.divisionRegEx)) {
            let _we = this.currentOperand.match(this.divisionRegEx).map((v) => this.someRecursiveMethod(v))
            console.log('_we for ÷', _we);
            this.currentOperand.match(this.divisionRegEx).forEach((v, i) => {
                this.currentOperand = this.currentOperand.replace(v, _we[i])
            })
            this.compute()
        } else if (this.currentOperand.match(this.multiplicationRegEx)) {
            console.log(this.currentOperand,'******', this.currentOperand.match(this.multiplicationRegEx));
            let _we = this.currentOperand.match(this.multiplicationRegEx).map((v) => this.someRecursiveMethod(v))
            console.log('_we for *', _we);
            this.currentOperand.match(this.multiplicationRegEx).forEach((v, i) => {
                this.currentOperand = this.currentOperand.replace(v, _we[i])
            })

            this.compute()
        } else if (this.currentOperand.match(this.additionRegEx)) {
            console.log('');
            let _we = this.currentOperand.match(this.additionRegEx).map((v) => this.someRecursiveMethod(v))

            this.currentOperand.match(this.additionRegEx).forEach((v, i) => {
                this.currentOperand = this.currentOperand.replace(v, _we[i])
            })
            this.compute()
        } else if (this.currentOperand.match(this.subtractionRegEx)) {
            let _we = this.currentOperand.match(this.subtractionRegEx).map((v) => this.someRecursiveMethod(v))

            this.currentOperand.match(this.subtractionRegEx).forEach((v, i) => {
                this.currentOperand = this.currentOperand.replace(v, _we[i])
            })
            this.compute()
        } else {

        }
        
        // this.operation = undefined
        // this.previousOperand = ''
    }

    getDisplayNumber(number) { // :)
        return number
    }

    /**
     * update the values inside of the output
     */
    updateDisplay() {
        console.log(`current operation ${this.operation}, prev. operand ${this.previousOperand}`);
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (!this.previousOperand) { // if it (previousOperand) was totally empty
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)}`
        } else { // we should add, if it's set, then they can start with operations
            // this.previousOperandTextElement.innerText = ''
            // we should do compute here, where we add the pevious operand, and the current one
        }
    }

    addNumbers(_inputArr){
        return _inputArr.map((v) => parseFloat(v)).reduce((pV, cV) => pV + cV)
    }

    multiplyNumbers(_inputArr) {
        return _inputArr.map((v) => parseFloat(v)).reduce((pV, cV) => pV * cV)
    }

    subtractNumbers(_inputArr){
        return _inputArr.map((v) => parseFloat(v)).reduce((pV, cV) => pV - cV)
    }

    divideNumbers(_inputArr) {
        return _inputArr.map((v) => parseFloat(v)).reduce((pV, cV) => pV / cV)
    }

    /**
     * B O D M A S accordance
     * if it contains only one operation, then perform the arithmetic operation, and return result
     * @param {string} _inputString a sting that's either all number or includes an operation
     */
    someRecursiveMethod(_inputString) {
        if (new RegExp(this.divisionRegEx).test(_inputString)) { 
            return this.divideNumbers(_inputString.split('÷'))
        } else if (new RegExp(this.multiplicationRegEx).test(_inputString)) {
            return this.multiplyNumbers(_inputString.split('*'))
        } else if (new RegExp(this.additionRegEx).test(_inputString)) { 
            return this.addNumbers(_inputString.split('+'))
        } else if (new RegExp(this.subtractionRegEx).test(_inputString)) {
            return this.subtractNumbers(_inputString.split('-'))
        } else {
            return _inputString
        }
    }
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(`clicked the ${button.innerText} number button`);
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(`clicked the ${button.innerText} operation button`);
        calculator.appendNumber(button.innerText)
        // calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    console.log('clicked equal button');
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    console.log('clicked AC button');
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    console.log('clicked delete button');
    calculator.delete()
    calculator.updateDisplay()
})