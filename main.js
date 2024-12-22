const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "*", "/"];

let firstNumber = "0";
let operator = "";
let nextOperator = "";
let secondNumber = "";
let displayText = firstNumber;
let readyToCalculate = false;
let result = undefined;
let decimal = false;

display.textContent = `${displayText}`;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
    let pressedButton = button.id;
        getCalculation(pressedButton);
    })
})

function clear(selectedButton) {

    const isNumber = numbers.includes(selectedButton);
    const isOperator = operators.includes(selectedButton);

    if (nextOperator && result) {
        firstNumber = result;
        operator = nextOperator;
        nextOperator = "";
        secondNumber = "";
        displayText = firstNumber + secondNumber;
        result = undefined;
        readyToCalculate = false;
    }

    if (selectedButton === "clear" || (result && isNumber)) {
        firstNumber = "0";
        operator = "";
        nextOperator = "";
        secondNumber = "";
        displayText = firstNumber;
        result = undefined;
        readyToCalculate = false;
    }

    if (result && isOperator) {
        firstNumber = result;
        operator = "";
        secondNumber = "";
        displayText = firstNumber;
        result = undefined;
        readyToCalculate = false;
    } 
};


function getFirstNumber(selectedButton) {

    const isNumber = numbers.includes(selectedButton);

    if (!decimal && selectedButton === ".") {
        firstNumber += selectedButton
        decimal = true
    }
    
    if (firstNumber === "0" && (!operator && isNumber)) {
      firstNumber = selectedButton;

    } else if (isNumber && !operator) {
      firstNumber += selectedButton;

    } else {
      firstNumber = firstNumber;
    }

    displayText = firstNumber;
    return firstNumber
}


function getOperator (selectedButton) {

    const isOperator = operators.includes(selectedButton);

    if (operator && secondNumber) {
        operator = operator

    } else if (operator && isOperator) {
        operator = selectedButton;

    } else if (isOperator && firstNumber) {
        operator = selectedButton;    
    } 

    displayText = firstNumber + operator;
    return operator;
};


function getSecondNumber(selectedButton) {

    const isNumber = numbers.includes(selectedButton);
    const isOperator = operators.includes(selectedButton);

    if (secondNumber && selectedButton === "=") {
        readyToCalculate = true;

    } else if (secondNumber && isOperator) {
        nextOperator = selectedButton;
        readyToCalculate = true;
    }

    if (firstNumber && operator && !readyToCalculate) {
        if (!secondNumber && selectedButton === "0") {
            secondNumber = secondNumber;

        } else if (isNumber) {
            secondNumber += selectedButton;
        }
    }

    displayText = firstNumber + operator + secondNumber;
    return secondNumber;

};


function operate(a, b, operator) {

    a = parseInt(a);
    b = parseInt(b);

   const mathCalculations = [
    {math: "+", calculate: function (a, b) {return a + b}},
    {math: "-", calculate: function (a, b) {return a - b}},
    {math: "*", calculate: function (a, b) {return a * b}},
    {math: "/", calculate: function (a, b) {return a / b}}
   ];

   
    result = mathCalculations.filter((calc) => calc.math === operator)
                             .map((calc) => calc.calculate(a, b))
                             .join("");

    if (nextOperator) {
        displayText = result + nextOperator;
    } else {
        displayText = result;
    }

   return result;
};


function getCalculation (selectedButton) {
  
    clear(selectedButton);
    getFirstNumber(selectedButton);
    getOperator(selectedButton);
    getSecondNumber(selectedButton);
 
    if (readyToCalculate) {
        operate(firstNumber, secondNumber, operator);
    } 
 
    display.textContent = `${displayText}`;
    
 };