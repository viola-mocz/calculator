// calculator operators for two numbers
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

// apply any of the above operators on two numbers
function operate(num1, num2, operation) {
    return operation(num1, num2);
}

