const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const operators = ["+", "-", "*", "/"];

const firstNumber = {
    value: "0",
    active: true,
    decimal: false,
    negative: {
        active: false,
        value: ""
    }
};

const operator = {
    value: "",
    nextValue: "",
    active: false,
};

const secondNumber = {
    value: "0",
    active: false,
    decimal: false,
    negative: {
        active: false,
        value: ""
    }
};

const showCalculate = {
    result: undefined,
    ready: false,
    displayText: firstNumber.value
};

display.textContent = showCalculate.displayText;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
    const pressedButton = button.id;
    const pressedClass = button.className;
        getCalculation(pressedButton, pressedClass);
    })
});


document.body.addEventListener("keydown", (e) => {
    
    const isNumber = numbers.includes(e.key);
    const isOperator = operators.includes(e.key);
    let keyPressed = undefined;
    let keyClass = undefined;

    if (isNumber) {
        keyPressed = e.key;
        keyClass = "numbers";
    } else if (isOperator) {
        keyPressed = e.key;
        keyClass = "operators";
    } else if (e.key === "=") {
        keyPressed = "=";
    } else if (e.code === "KeyA") {
        keyPressed = "clear";
    } else if (e.key === ".") {
        keyPressed = ".";
        keyClass = "decimal";
    } else if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        keyPressed = "=";
    } else if (e.code === "Backspace") {
        keyPressed = "backspace";
    } else if (e.code === "KeyN") {
        keyPressed = "negative";
    }

    getCalculation(keyPressed, keyClass);
        
});


function clear(selectedButton, selectedClass) {
    if (showCalculate.result && operator.nextValue) {
        firstNumber.value = showCalculate.result;
        firstNumber.active = false;
        firstNumber.negative.value = "";
        firstNumber.negative.active = false;
        operator.value = operator.nextValue;
        operator.active = false;
        operator.nextValue = "";
        secondNumber.value = "0";
        secondNumber.active = true;
        secondNumber.decimal = false;
        secondNumber.negative.active = false;
        secondNumber.negative.value = "";
        showCalculate.result = undefined;
        showCalculate.ready = false;
        showCalculate.displayText = secondNumber.value;
    } 

    if (selectedButton === "clear" || 
        (showCalculate.result && 
            (selectedClass === "numbers" || selectedButton === "negative" || selectedButton === "backspace"))) {

        firstNumber.value = "0";
        firstNumber.active = true;
        firstNumber.decimal = false;
        firstNumber.negative.active = false;
        firstNumber.negative.value = "";
        operator.value = "";
        operator.nextValue = "";
        operator.active = false;
        secondNumber.value = "0";
        secondNumber.active = false;
        secondNumber.decimal = false;
        secondNumber.negative.active = false;
        secondNumber.negative.value = "";
        showCalculate.result = undefined;
        showCalculate.ready = false;
        showCalculate.displayText = firstNumber.value;
    }

    if (showCalculate.result && selectedClass === "operators") {
        firstNumber.value = showCalculate.result;
        firstNumber.active = false;
        firstNumber.negative.value = "";
        firstNumber.negative.active = false;
        operator.active = true;
        operator.value = "";
        operator.nextValue = "";
        secondNumber.value = "0";
        secondNumber.active = false;
        secondNumber.decimal = false;
        secondNumber.negative.active = false;
        secondNumber.negative.value = "";
        showCalculate.result = undefined;
        showCalculate.ready = false;
        showCalculate.displayText = firstNumber.value;
    }
};


function backSpace(selectedButton) {
    if (selectedButton === "backspace") {
        if (firstNumber.active && firstNumber.value.length === 1) {
            firstNumber.value = "0";
        } else if (firstNumber.active) {
            firstNumber.value = firstNumber.value.slice(0, -1);
        } 

        if (secondNumber.active && secondNumber.value.length === 1) {
            secondNumber.value = "0";
        } else if (secondNumber.active) {
            secondNumber.value = secondNumber.value.slice(0, -1);
        }
    }
};
    

function getFirstNumber(selectedButton, selectedClass) {
    if (firstNumber.value.length < 10) {
        if (selectedClass === "decimal" && !firstNumber.decimal) {
            firstNumber.value += selectedButton;
            firstNumber.decimal = true;
        }
        
        if (selectedClass === "numbers") {
            if (firstNumber.value === "0") {
                firstNumber.value = selectedButton;
            } else {
                firstNumber.value += selectedButton;
            }  
        }
    }
    
    let checkNotZero = stringToNumber(firstNumber.value);

    if (checkNotZero === 0) {
        firstNumber.negative.value = "";
        firstNumber.negative.active = false;
    } else if (selectedButton === "negative" && !firstNumber.negative.active) {
        firstNumber.negative.value = "-";
        firstNumber.negative.active = true;
    } else if(selectedButton === "negative" && firstNumber.negative.active) {
        firstNumber.negative.value = "";
        firstNumber.negative.active = false;
    }
  
    operator.active = true;
    showCalculate.displayText = firstNumber.negative.value + firstNumber.value;
    
};


function getOperator(selectedButton, selectedClass) {
    
    if (selectedClass === "operators") {
        operator.value = selectedButton;    
        firstNumber.active = false;
        secondNumber.active = true;
    }

    showCalculate.displayText = secondNumber.negative.value + secondNumber.value;
};


function getSecondNumber(selectedButton, selectedClass) {

    if (selectedButton === "=") {
        showCalculate.ready = true;
    } else if (selectedClass === "operators") {
        showCalculate.ready = true;
        operator.nextValue = selectedButton;
    }

    if (secondNumber.value.length < 10) {    
        if (selectedClass === "decimal" && !secondNumber.decimal) {
            secondNumber.value += selectedButton;
            secondNumber.decimal = true;
        }
    
        if (selectedClass === "numbers") {
            if (secondNumber.value === "0") {
                secondNumber.value = selectedButton;
            } else {
                secondNumber.value += selectedButton;
            }  
        }
    }

    let checkNotZero = stringToNumber(secondNumber.value);

    if (checkNotZero === 0) {
        secondNumber.negative.value = "";
        secondNumber.negative.active = false;
    } else if (selectedButton === "negative" && !secondNumber.negative.active) {
        secondNumber.negative.value = "-";
        secondNumber.negative.active = true;
    } else if(selectedButton === "negative" && secondNumber.negative.active) {
        secondNumber.negative.value = "";
        secondNumber.negative.active = false;
    }

    operator.active = false;
    showCalculate.displayText = secondNumber.negative.value + secondNumber.value; 
};


function stringToNumber(string) {

    isFloatNum = string.split("").includes(".");
    if (isFloatNum) {
        return parseFloat(string);
    } else {
        return parseInt(string);
    }
};


function operate(a, b, operator) {

    a = stringToNumber(a);
    b = stringToNumber(b);

    const mathCalculations = [
    {math: "+", calculate: function (a, b) {return a + b}},
    {math: "-", calculate: function (a, b) {return a - b}},
    {math: "*", calculate: function (a, b) {return a * b}},
    {math: "/", calculate: function (a, b) {return a / b}}
    ];

    if ((a === 0 || b === 0) && operator === "/") {
        showCalculate.displayText = "ERROR =)";
        showCalculate.result = "0";
    } else {
        showCalculate.result = mathCalculations
        .filter((calc) => calc.math === operator)
        .map((calc) => calc.calculate(a, b))
        .join("");

        if (showCalculate.result.length < 11) {
            showCalculate.displayText = showCalculate.result;
        } else {
            let thereIsDecimal = showCalculate.result.slice(0,10).split("").includes(".")
            if (thereIsDecimal) {
                showCalculate.result = parseFloat(showCalculate.result).toFixed(10).slice(0, 10);
                showCalculate.displayText = showCalculate.result;
            } else {
                showCalculate.displayText = "ERROR =(";
                showCalculate.result = "0";
            }   
        }
    }
};


function getCalculation(selectedButton, selectedClass) {

    backSpace(selectedButton);
    clear(selectedButton, selectedClass);

    if (secondNumber.active) {
        getSecondNumber(selectedButton, selectedClass);
    }
    
    if (operator.active) {
        getOperator(selectedButton, selectedClass);
    }
        
    if (firstNumber.active) {
        getFirstNumber(selectedButton, selectedClass);
    } 

    if (showCalculate.ready) {
        const firstNum = firstNumber.negative.value + firstNumber.value;
        const secondNum = secondNumber.negative.value + secondNumber.value;
        const opr = operator.value;
        operate(firstNum, secondNum, opr);
    }

    display.textContent = showCalculate.displayText;

};