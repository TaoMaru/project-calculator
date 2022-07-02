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
let clearKey;
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

let result;

function findKey(e) {
    if( e.target.dataset.key !== undefined ) {
        keyValue = e.target.dataset.key;
        if(keyValue !== "Escape") {
            if( keyValue === "Backspace" ) {
                undoLastEntry();
            }
            else {
                updateCalcDisplay();
            }
        }
        else {
            clearCalcDisplay();
        }
    };
};

function findPressedKey(e) {
    try {
        pressedKey = document.querySelector(`div[data-key="${e.key}"`);
        pressedKey.classList.add("clickedNum");
        keyValue = pressedKey.dataset.key;
        clearKey = document.querySelector(".clear");
        if( e.key === "Escape") {
            pressedKey = clearKey;
            keyValue = pressedKey.dataset.key;
            clearCalcDisplay();
        }
        else if( e.key === "Backspace" ) {
            undoLastEntry();
        }
        else {
            updateCalcDisplay();
        }
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

//update calc display & perform calculation:
function updateCalcDisplay() {
    if( keyValue != '=' ) {
        if( keyValue === "+" || keyValue === "-" || 
                keyValue === "*" || keyValue === "/") {
            displayText.textContent = "";
            newOperator = keyValue;
        }
        else {
            displayText.textContent += keyValue;
        }
        updateComputingInput();
    }
    else {
        let inputToCalc = computingInput.split(newOperator);
        computingObj = makeOperation(parseFloat(inputToCalc[0]), 
                        newOperator, parseFloat(inputToCalc[1]) );
        
        result = Math.round(operate(computingObj) *100) / 100;
        if( isNaN(result) ) {
            displayText.textContent = "Cannot compute...";
        }
        else {
            displayText.textContent = result;
        }
    };
};

function updateComputingInput() {
    computingInput += keyValue;
};

//Clear calc obj and calc display:
function clearCalcDisplay() {
    displayText.textContent = "";
    computingInput = "";
    computingObj = {};
    for( opBtn of operatorBtns) {
        if( opBtn.classList.contains("clickedNum") ) {
            opBtn.classList.remove("clickedNum");
        }
    };
};

//Remove last input/char from display & running input:
function undoLastEntry() {
    let currentText = displayText.textContent.split("");
    currentText.pop();
    displayText.textContent = currentText.join("");

    let currentComputingInput = computingInput.split("");
    currentComputingInput.pop();
    computingInput = currentComputingInput.join("");
};