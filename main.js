//Style event listeners & functions:
const numberBtns = document.querySelectorAll(".numberPad");
for( let numBtn of numberBtns) {
    numBtn.addEventListener("click", addNumClickStyle);
    numBtn.addEventListener("transitionend", removeNumClickStyle);
};

const operatorBtns = document.querySelectorAll(".operator");
for( let opBtn of operatorBtns ) {
    opBtn.addEventListener("click", addOpClickStyle);
    opBtn.addEventListener("transitionend", removeOpClickStyle);
};

function addNumClickStyle(e) {
    e.target.classList.add("clickedNum");
};

function removeNumClickStyle(e) {
    e.target.classList.remove("clickedNum");
};

function addOpClickStyle(e) {
    e.target.classList.add("clickedOperator");
};

function removeOpClickStyle(e) {
    e.target.classList.remove("clickedOperator");
}

//Calculator functions:
const add = function(num1, num2) {
    let sum = num1 + num2;
    return sum;
};
  
const subtract = function(num1, num2) {
    let difference = num1 - num2;
    return difference;
};

const multiply = function(num1, num2) {
    let product = num1 * num2;
    return product;
};

const divide = function(num1, num2) {
    let quotient = num1 / num2;
    return quotient;
};


const operate = function(computingObj) {
    let number1 = computingObj.firstNum;
    let number2 = computingObj.secondNum;
    switch(computingObj.operator) {
        case "+" : 
            return add(number1, number2);
            break;
        case "-" : 
            return subtract(number1, number2);
            break;
        case "*" : 
            return multiply(number1, number2);
            break;
        case "/" : 
            return divide(number1, number2);
            break;
    };
};


//Operation variables, event listeners:
const numPad = document.querySelector(".numberPadContainer");
numPad.addEventListener("click", findKey);

const operatorPad = document.querySelector(".operatorContainer");
operatorPad.addEventListener("click", findKey);

const displayArea = document.querySelector(".calcDisplay");

let displayText = document.createElement("p");
displayArea.appendChild(displayText);

window.addEventListener( "keydown", findPressedKey);

let pressedKey;
let enterKey;
let keyValue;

let computingObj = {};

function makeOperation(firstNum, operator, secondNum) {
    return {
        firstNum : firstNum,
        operator : operator,
        secondNum : secondNum,
    };
};

let computingInput = "";

//computingObj = makeOperation(123, '+', 123);

//console.log(computingObj);

//let result = operate(computingObj);
//console.log(result);
let result;

function findKey(e) {
    if( e.target.dataset.key !== undefined ) {
        keyValue = e.target.dataset.key;
        updateCalcDisplay();
    };
};

function findPressedKey(e) {
    try {
        pressedKey = document.querySelector(`div[data-key="${e.key}"`);
        keyValue = pressedKey.dataset.key;
        updateCalcDisplay();
    }
    catch(TypeError) {
        enterKey = document.querySelector(".equals");
        if( e.key === "Enter") {
            pressedKey = enterKey;
            keyValue = pressedKey.dataset.key;
            updateCalcDisplay();
        }
        return;
    };
};

let newOperator = "";

function updateCalcDisplay() {
    if( keyValue != '=' ) {
        if( keyValue === "+" || keyValue === "-" || 
                keyValue === "*" || keyValue === "/") {
            displayText.textContent = "";
            newOperator = keyValue;
            console.log(newOperator);
        }
        else {
            displayText.textContent += keyValue;
            console.log(keyValue);
        }
        updateComputingInput();
        console.log(computingInput);
    }
    else {
        console.log(keyValue);
        displayText.textContent = "calculating...";
        let inputToCalc = computingInput.split(newOperator);
        computingObj = makeOperation(parseInt(inputToCalc[0]), 
                        newOperator, parseInt(inputToCalc[1]) );
        console.log(computingObj);
        result = Math.round(operate(computingObj) *100) / 100;
        displayText.textContent = result;
    };
};

function updateComputingInput() {
    computingInput += keyValue;
};