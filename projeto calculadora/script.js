const previousDigitMain = document.querySelector("#previous-digit")
const currentDigitMain = document.querySelector("#current-digit")
const btns = document.querySelectorAll("#btn-box button")

class Calculator {
    constructor(previousDigitMain, currentDigitMain){
        this.previousDigitMain = previousDigitMain;
        this.currentDigitMain = currentDigitMain;
        this.currentOperation = "" 
    }

    showDigits(digit) {
        if(digit === "." && this.currentDigitMain.innerText.includes(".")) {
            return
        }
        this.currentOperation = digit
        this.updateScreen()
    }

    operationSymbols(operation){

        if(this.currentDigitMain.innerText === "" && operation !== "C" ){

            if(this.currentDigitMain.innerText !== "") {
                this.changeOperation(operation)
            }

            return
        }

        let operationValue
        let previousValue = +this.previousDigitMain.innerText.split(" ")[0]
        let currentValue = +this.currentDigitMain.innerText

        switch (operation) {
            case "+":
                operationValue = previousValue + currentValue
                this.updateScreen(operationValue, operation, currentValue, previousValue)
                break;

            case "-":
                operationValue = previousValue - currentValue
                this.updateScreen(operationValue, operation, currentValue, previousValue)
                break;

            case "*":
                operationValue = previousValue * currentValue
                this.updateScreen(operationValue, operation, currentValue, previousValue)
                break;

            case "/":
            operationValue = previousValue / currentValue
            this.updateScreen(operationValue, operation, currentValue, previousValue)
                break;

            case "DEL":
                this.delOperation()
                break;

            case "CE":
                this.ceOperation()
                break;

            case "C":
                this.cOperation()
                break;

            case "=":
                this.equalOperation()
                break;

            default:
                break;
        }
        
    }

    updateScreen(
        operationValue = null,
        operation = null,
        currentValue = null,
        previousValue = null
        ) {

        if(operationValue === null) {
            this.currentDigitMain.innerText += this.currentOperation
        } else {

            if(previousValue === 0) {
                operationValue = currentValue
            }

            this.previousDigitMain.innerText = `${operationValue} ${operation}`
            this.currentDigitMain.innerText = "";
        }
    }

    changeOperation(operation) {
        const operationSymbol = ["+", "-", "/", "*"];

        if(!operationSymbol.includes(operation)) {
            return
        }

        this.previousDigitMain.innerText = this.previousDigitMain.innerText.slice(0, -1) + operation
    }

    delOperation() {
        this.currentDigitMain.innerText = this.currentDigitMain.innerText.slice(0, -1)
        
    }

    ceOperation() {
        this.currentDigitMain.innerText = ""
    }

    cOperation() {
        this.currentDigitMain.innerText = "";
        this.previousDigitMain.innerText = "";    
    }

    equalOperation() {
        let operation = this.previousDigitMain.innerText.split(" ")[1]

        this.operationSymbols(operation)
    }

}

// invoca a class Calculator
const calc = new Calculator(previousDigitMain, currentDigitMain)

// loop para verificar se o botão é número ou símbolo de operação
btns.forEach((button) => {
    button.addEventListener("click", (e) => {
        const value = e.target.innerText
        
        if(+value > -1 || value === ".") {
            calc.showDigits(value)
            console.log(value)
        } else {
            calc.operationSymbols(value)
            console.log(value)
        }
    })
})