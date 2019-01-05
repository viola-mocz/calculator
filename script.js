// calculator operators for two numbers that are recorded as strings
function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
    return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2) {
    return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2) {
    return parseFloat(num1) / parseFloat(num2);
}

// apply any of the above operators on two numbers, where operator is a string
function operate(num1, num2, operator) {
    return window[operator](num1, num2);
}

// value shown on calculator
let display = document.querySelector(".num-display");

const buttons = document.querySelectorAll("button");
const calculator = document.querySelector(".calc-container");

// start off with number 0
calculator.dataset.previousKeyType = "number";

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (e.target.matches("button")) {
            const key = e.target;
            const action = key.dataset.action;
            const keyContent = key.textContent;
            const displayedNum = display.textContent;
            const previousKeyType = calculator.dataset.previousKeyType

            // changing the display

            // Remove .is-depressed class from all keys
            Array.from(key.parentNode.children)
                .forEach((k) => k.classList.remove('is-depressed'));

            // if the button is a number
            if (!action) {
                // completely replace if starting from beginning or previously
                // clicked on operator
                if ((displayedNum === "0") || (previousKeyType === "operator")) {
                    display.textContent = keyContent;
                } else {
                    // concatenate numbers
                    display.textContent = displayedNum + keyContent;
                }
            }

            // if the button is a decimal
            if (action === "decimal") {
                display.textContent = displayedNum + keyContent;
            }

            // if the button is an operator
            if (
                action === "add" ||
                action === "subtract" ||
                action === "multiply" ||
                action === "divide"
            ) {
                // show operator is activated by leaving it depressed
                key.classList.add('is-depressed');
                // change state of previous key
                calculator.dataset.previousKeyType = "operator";

                // save input
                calculator.dataset.firstValue = displayedNum;
                calculator.dataset.operator = action;
            }

            // if the button is equals
            if (action === "calculate") {
                // calculate and show result
                const firstValue = calculator.dataset.firstValue;
                const operator = calculator.dataset.operator;
                const secondValue = displayedNum;
                display.textContent = operate(firstValue, secondValue, operator);
            }
        }
    });
});