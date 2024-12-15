const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "*", "/"];

let firstNumber = "";
let operator = "";
let secondNumber = "";
let calculate = false;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
    let pressedButton = button.id;
    calculation(pressedButton)   
    })
})

function getFirstNumber(selectedButton) {
    // RULES
    // checking number is selected
    const isNumber = numbers.includes(selectedButton);
    // checking if first character in first number string is number
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

function getSecondNumber (selectedButton) {
    // RULES
    // checking number is selected
    const isNumber = numbers.includes(selectedButton);
    // checking if first character in second number string is number
    const firstCharacterIsNumber = numbers.includes(secondNumber[0]);
    // checking if operator is selected
    const isOperator = operators.includes(selectedButton);

    if (secondNumber === "" && selectedButton === "0") {
        display.textContent = `${firstNumber} ${operator}`;
        
    
    } else if (firstCharacterIsNumber && selectedButton === "=") {
        calculate = true;
        display.textContent = `${firstNumber} ${operator} ${secondNumber}`;
        return secondNumber, calculate;

    } else if (isNumber) {
        secondNumber += selectedButton;
        display.textContent = `${firstNumber} ${operator} ${secondNumber}`;
    
    } else {
        display.textContent = `${firstNumber} ${operator} ${secondNumber}`;
    }
}


const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;



function operate(firstNumber, operator, secondNumber) {
    firstNumber = parseInt(firstNumber);
    secondNumber = parseInt(secondNumber);
    let result = 0
    if (operator === "+") {
        result = add(firstNumber, secondNumber);
        display.textContent = `${result}`;
        return result;
    } else if (operator === "-") {
        result = substract(firstNumber, secondNumber);
        display.textContent = `${result}`;
        return result;
    } else if (operator === "*") {
        result = multiply(firstNumber, secondNumber);
        display.textContent = `${result}`;
        return result;
    } else if (operator === "/") {
        result = divide(firstNumber, secondNumber);
        display.textContent = `${result}`;
        return result;
    }
}

function calculation(selectedButton) {
    if (selectedButton === "clear") {
        firstNumber = "";
        secondNumber = "";
        operator = "";
        display.textContent = "";
    }
  
    if (!operator) {
        getFirstNumber(selectedButton);
    } else {
        getSecondNumber(selectedButton);
    }

    if (calculate === true){
        operate(firstNumber, operator, secondNumber);
        calculate = false;
        firstNumber = "";
        secondNumber = "";
        operator = "";      
    }
}

