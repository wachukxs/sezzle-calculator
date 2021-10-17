
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
// const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

class Calculator {
    constructor(currentOperandTextElement) {
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    multiplicationRegEx = /(\d*\.*\d+\*\d*\.*\d+)/g
    additionRegEx = /(\d*\.*\d+\+\d*\.*\d+)/g // /([-|\+]?\d*\.*\d+\+\d*\.*\d+)/g // todo: support prepending -
    subtractionRegEx = /(\d*\.*\d+-\d*\.*\d+)/g // /([-|\+]?\d*\.*\d+-\d*\.*\d+)/g // todo: support prepending +
    divisionRegEx = /(\d*\.*\d+÷\d*\.*\d+)/g

    arithmeticOperations = new Set(['÷', '-', '+', '*'])

    /**
     * delete all the displayed values. set this.currentOperand to an empty string if/since the values on the output are removed.
     * do the same for the previous operand. change this.operation to be undefined.
     */
    clear() {
        this.currentOperand = ''
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
        // can't append an operation if the last click was also an operation.
        if (
            (this.arithmeticOperations.has(number) && this.arithmeticOperations.has(this.currentOperand.toString().slice(-1)))
            ||
            (this.currentOperand == '' && this.arithmeticOperations.has(number)) // can't start with operation
            ) {
            console.log('nope'); // show an alert or message or something
            return
        }
        console.log(`appending ${number.toString()} to ${this.currentOperand.toString()}`);
        this.currentOperand = this.currentOperand.toString() + number.toString()
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
            let _we = this.currentOperand.match(this.divisionRegEx).map((v) => this.performArithmeticOperation(v))
            this.currentOperand.match(this.divisionRegEx).forEach((v, i) => {
                this.currentOperand = this.currentOperand.replace(v, _we[i])
            })
            this.compute()
        } else if (this.currentOperand.match(this.multiplicationRegEx)) {
            let _we = this.currentOperand.match(this.multiplicationRegEx).map((v) => this.performArithmeticOperation(v))

            this.currentOperand.match(this.multiplicationRegEx).forEach((v, i) => {
                this.currentOperand = this.currentOperand.replace(v, _we[i])
            })

            this.compute()
        } else if (this.currentOperand.match(this.additionRegEx)) {

            let _we = this.currentOperand.match(this.additionRegEx).map((v) => this.performArithmeticOperation(v))

            this.currentOperand.match(this.additionRegEx).forEach((v, i) => {
                this.currentOperand = this.currentOperand.replace(v, _we[i])
            })
            this.compute()
        } else if (this.currentOperand.match(this.subtractionRegEx)) {
            let _we = this.currentOperand.match(this.subtractionRegEx).map((v) => this.performArithmeticOperation(v))

            this.currentOperand.match(this.subtractionRegEx).forEach((v, i) => {
                this.currentOperand = this.currentOperand.replace(v, _we[i])
            })
            this.compute()
        }
    }

    getDisplayNumber(number) { // :)
        return number
    }

    /**
     * update the values inside of the output
     */
    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        
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
    performArithmeticOperation(_inputString) {
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

const calculator = new Calculator(currentOperandTextElement)

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