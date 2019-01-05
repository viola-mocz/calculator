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
            const previousKeyType = calculator.dataset.previousKeyType;

            // changing the display

            // Remove .is-depressed class from all keys
            Array.from(key.parentNode.children)
                .forEach((k) => k.classList.remove('is-depressed'));

            // if the button is a number
            if (!action) {
                // completely replace if starting from beginning or previously
                // clicked on operator
                if ((displayedNum === "0") || (previousKeyType === "operator") || (previousKeyType === "calculate")) {
                    display.textContent = keyContent;
                } else {
                    // concatenate numbers
                    display.textContent = displayedNum + keyContent;
                }

                calculator.dataset.previousKeyType = "number";
            }

            // if the button is a decimal
            if (action === "decimal") {
                // don't allow more than one decimal
                if (!displayedNum.includes('.')) {
                    display.textContent = displayedNum + '.';
                } else if ((previousKeyType === "operator") || (previousKeyType === "calculate")) {
                    display.textContent = '0.';
                }

                calculator.dataset.previousKeyType = "decimal";
            }

            // if the button is an operator
            if (
                action === "add" ||
                action === "subtract" ||
                action === "multiply" ||
                action === "divide"
            ) {
                // check for previous operations to update display
                const firstValue = calculator.dataset.firstValue;
                const operator = calculator.dataset.operator;
                const secondValue = displayedNum;

                // Note: It's sufficient to check for firstValue and operator because secondValue always exists
                if (firstValue && operator && previousKeyType !== "operator" && previousKeyType !== "calculate") {
                    const calcValue = operate(firstValue, secondValue, operator);
                    display.textContent = calcValue;
                    // Update calculated value as firstValue
                    calculator.dataset.firstValue = calcValue;
                } else {
                    // If there are no calculations, set displayedNum as the firstValue
                    calculator.dataset.firstValue = displayedNum;
                }

                // show operator is activated by leaving it depressed
                key.classList.add('is-depressed');
                // change state of previous key
                calculator.dataset.previousKeyType = "operator";
                // save the operation
                calculator.dataset.operator = action;
            }

            // if the button is equals
            if (action === "calculate") {
                // calculate and show result
                let firstValue = calculator.dataset.firstValue;
                const operator = calculator.dataset.operator;
                let secondValue = displayedNum;

                // have something to calculate
                if (firstValue) {
                    // can do same calculation again
                    if (previousKeyType === "calculate") {
                        firstValue = displayedNum;
                        secondValue = calculator.dataset.modValue;
                    }

                    display.textContent = operate(firstValue, secondValue, operator);
                }

                // save the second value in case we want to make same calculation over again
                calculator.dataset.modValue = secondValue;

                calculator.dataset.previousKeyType = "calculate";
            }

            // if the button is clear
            if (action === "clear") {
                // remove all saved data with AC
                if (key.textContent === "AC") {
                    calculator.dataset.firstValue = '';
                    calculator.dataset.modValue = '';
                    calculator.dataset.operator = '';
                    calculator.dataset.previousKeyType = '';
                  } else {
                    // don't remove data with CE
                    key.textContent = "AC";
                }
                // show 0 in the display
                display.textContent = 0;
                calculator.dataset.previousKeyType = "clear";
            }

            // if the button is not clear, change AC to CE;
            if (action !== "clear") {
                const clearButton = calculator.querySelector('[data-action=clear]');
                clearButton.textContent = 'CE';
            }

        }
    });
});