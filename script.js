// calculator operators for two numbers that are recorded as strings
function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2)
}

function subtract(num1, num2) {
    return parseFloat(num1) - parseFloat(num2)
}

function multiply(num1, num2) {
    return parseFloat(num1) * parseFloat(num2)
}

function divide(num1, num2) {
    return parseFloat(num1) / parseFloat(num2)
}

// apply any of the above operators on two numbers, where operator is a string
function calculate(num1, operator, num2) {
    return window[operator](num1, num2)
}

// return the key type
const getKeyType = (key) => {
    const action = key.dataset.action
    if (!action) return "number"
    if (
        action === "add" ||
        action === "subtract" ||
        action === "multiply" ||
        action === "divide"
    ) return "operator"
    // For everything else, return the action
    return action
}

// create the result string to be displayed on the calculator
const createResultString = (key, displayedNum, state) => {
    const keyContent = key.textContent
    const firstValue = state.firstValue
    const modValue = state.modValue
    const operator = state.operator
    const previousKeyType = state.previousKeyType
    const keyType = getKeyType(key)

    if (keyType === "number") {
        return displayedNum === "0" ||
            previousKeyType === "operator" ||
            previousKeyType === "calculate" ?
            keyContent :
            displayedNum + keyContent
    }

    if (keyType === "decimal") {
        if (!displayedNum.includes(".")) return displayedNum + "."
        if (previousKeyType === "operator" || previousKeyType === "calculate") return "0."
        return displayedNum
    }

    if (keyType === "operator") {
        return firstValue &&
            operator &&
            previousKeyType !== "operator" &&
            previousKeyType !== "calculate" ?
            calculate(firstValue, operator, displayedNum) :
            displayedNum
    }

    if (keyType === "clear") return 0

    if (keyType === "calculate") {
        return firstValue ?
            previousKeyType === "calculate" ?
            calculate(displayedNum, operator, modValue) :
            calculate(firstValue, operator, displayedNum) :
            displayedNum
    }
}

// update the values saved in calculator
const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
    const keyType = getKeyType(key)
    const modValue = calculator.dataset.modValue
    const firstValue = calculator.dataset.firstValue
    const previousKeyType = calculator.dataset.previousKeyType
    const operator = calculator.dataset.operator
    calculator.dataset.previousKeyType = keyType

    if (keyType === "operator") {
        calculator.dataset.operator = key.dataset.action
        calculator.dataset.firstValue = firstValue &&
            operator &&
            previousKeyType !== "operator" &&
            previousKeyType !== "calculate" ?
            calculatedValue :
            displayedNum
    }

    if (keyType === "clear") {
        if (key.textContent === "AC") {
            calculator.dataset.firstValue = ""
            calculator.dataset.modValue = ""
            calculator.dataset.operator = ""
            calculator.dataset.previousKeyType = ""
        }
    }

    if (keyType === "calculate") {
        calculator.dataset.modValue = firstValue && previousKeyType === "calculate" ?
            modValue :
            displayedNum
    }
}

// update the visuals of the calculator
const updateVisualState = (key, calculator) => {
    const keyType = getKeyType(key)

    Array.from(key.parentNode.children).forEach(k => k.classList.remove("is-depressed"))

    if (keyType === "operator") key.classList.add("is-depressed")

    if (keyType === "clear" && key.textContent !== "AC") {
        key.textContent = "AC"
    }

    if (keyType !== "clear") {
        const clearButton = calculator.querySelector("[data-action=clear]")
        clearButton.textContent = "CE"
    }
}

// value shown on calculator
let display = document.querySelector(".num-display")

const buttons = document.querySelectorAll("button")
const calculator = document.querySelector(".calc-container")

buttons.forEach((button) => { 
    button.addEventListener("click", (e) => {
        const key = e.target
        const displayedNum = display.textContent
        // Pure functions
        const resultString = createResultString(key, displayedNum, calculator.dataset)
        // Update states
        display.textContent = resultString
        updateCalculatorState(key, calculator, resultString, displayedNum)
        updateVisualState(key, calculator) 
    })
})
