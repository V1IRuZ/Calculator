const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "*", "/"];

let firstNumber = ""
let operator = ""
let secondNumber = ""

buttons.forEach((button) => {
    button.addEventListener("click", () => {
    let pressedButton = button.id;

        if (pressedButton === "clear") {
            firstNumber = "";
            secondNumber = "";
            operator = "";
            display.textContent = "";
        }
        if (!operator) {
            getFirstNumber(pressedButton);
        } 

    })
})

function getFirstNumber(selectedButton) {
    // checking number is selected
    const isNumber = numbers.includes(selectedButton);
    // checking if first character in string is number
    const firstCharacterIsNumber = numbers.includes(firstNumber[0]);
    // checking if operator is selected
    const isOperator = operators.includes(selectedButton);


    if (firstNumber === "" && selectedButton === "0") {
        display.textContent = `${firstNumber}`;
    
    } else if (firstCharacterIsNumber && isOperator) {
        operator = selectedButton;
        display.textContent = `${firstNumber} ${operator}`;
        return firstNumber, operator

    } else if (isNumber && selectedButton !== "=") {
        firstNumber += selectedButton;
        display.textContent = `${firstNumber}`;

    } else {
        display.textContent = `${firstNumber}`;
    }
}


const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;



function operate(firstNumber, operator, secondNumber) {
    firstNumber = parseInt(firstNumber);
    secondNumber = parseInt(secondNumber);
    if (operator === "+") {
        return add(firstNumber, secondNumber);
    } else if (operator === "-") {
        return substract(firstNumber, secondNumber);
    } else if (operator === "*") {
        return multiply(firstNumber, secondNumber);
    } else if (operator === "/") {
        return divide(firstNumber, secondNumber);
    }
}

