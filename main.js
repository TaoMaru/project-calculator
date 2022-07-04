//Style event listeners & functions:
//add eventListener to all numPad btns for click add/remove styling
const numberBtns = document.querySelectorAll(".numberPad");
for( let numBtn of numberBtns) {
    numBtn.addEventListener("click", addNumClickStyle);
    numBtn.addEventListener("transitionend", removeNumClickStyle);
};

//add eventListener to all operations btns for click add/remove styling
const operatorBtns = document.querySelectorAll(".operator");
for( let opBtn of operatorBtns ) {
    opBtn.addEventListener("click", addOpClickStyle);
    if(opBtn.dataset.key !== "=") {
        opBtn.addEventListener("transitionend", removeOpClickStyle);
    };
};

function addNumClickStyle(e) {
    e.target.classList.add("clickedNum"); //add style to num btn
};

function removeNumClickStyle(e) {
    e.target.classList.remove("clickedNum"); //remove style from num btn
};

function addOpClickStyle(e) {
    e.target.classList.add("clickedOperator"); //add style to op btn
};

function removeOpClickStyle(e) {
    e.target.classList.remove("clickedOperator"); //remove style from op btn
}


//Calculator functions:
//add second num to first num
const add = function(num1, num2) {
    let sum = num1 + num2;
    return sum;
};

//subtract second num from first num
const subtract = function(num1, num2) {
    let difference = num1 - num2;
    return difference;
};

//multiply second num to first num
const multiply = function(num1, num2) {
    let product = num1 * num2;
    return product;
};

//divide first num by second num
const divide = function(num1, num2) {
    let quotient = num1 / num2;
    return quotient;
};

//use values in computing obj, run specified operation
//return operation's result
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
//container for number pad btns & event listener
const numPad = document.querySelector(".numberPadContainer");
numPad.addEventListener("click", findKey);

//container for operations btns & event listener
const operatorPad = document.querySelector(".operatorContainer"); 
operatorPad.addEventListener("click", findKey);

const displayArea = document.querySelector(".calcDisplay"); // calc display window

const xFilesTheme = document.querySelector("audio"); // divide by 0 audio

let displayText = document.createElement("p"); //text for calc dipslay window
displayArea.appendChild(displayText);

const pageBody = document.querySelector("body"); //body of page
const transparentDiv = document.createElement("div"); //div to cover page content

window.addEventListener( "keydown", findPressedKey); //listen for keydowns, find targets

let pressedKey; //key selected from keydown on keyboard
let enterKey; //enter key on keyboard/numPad
let clearKey; //Esc key on keyboard
let keyValue; //value of key data property

let computingObj = {}; // stores operations as num1, operator, num2

//Use input to set values in computing obj
function makeOperation(firstNum, operator, secondNum) {
    return {
        firstNum : firstNum,
        operator : operator,
        secondNum : secondNum,
    };
};

let computingInput = ""; // input received from calculator

let result; // final calculation result

const operatorList = "+-*/"; // operators available/expected

// Compute received input--passed as param--2 operands at a time,
//keep running total, return final result
function convertToOperation(inputStr) {
    let workingInput = inputStr.split(""); //make array from input
    let operatorIndex = 0; // index of first operator in sequence
    let workingOperator; // index of operator used in next calculation
    let nextOperator; // operator following current one, may not exist
    let runningTotal = 0; // current result of calculations
    let firstOperand = parseFloat(inputStr); // get first number from input
    do {
        //find the first operator from input
        workingOperator = workingInput.find(e => operatorList.includes(e));
        //find the index of operator, use index to remove section of
        //working input array (everything after operator remains)
        operatorIndex = workingInput.indexOf(workingOperator);
        workingInput.splice(0,operatorIndex + 1);
        //make string from shortened working input array
        let newStr = workingInput.join("");
        //find next operator in sequence
        nextOperator = workingInput.find(e => operatorList.includes(e));
        //parse next operand from new string
        let nextOperand = parseFloat(newStr);
        //use first operand, working operator, & next operand to build computing obj
        computingObj = makeOperation(firstOperand, workingOperator, nextOperand);
        //update running total by executing first operation
        runningTotal = operate(computingObj);
        //replace first operand with running total
        firstOperand = runningTotal;    
    }
    while(nextOperator !== undefined); //no more operations to execute
    return runningTotal;
};

//return boolean if attempt to divide by zero in input
function isDividingByZero(str) {
    return str.includes("/0");
};


//Find clicked or pressed key & get keyCode:
//find clicked key, update display & running computing input
function findKey(e) {
    if( e.target.dataset.key !== undefined ) {
        //ignore clicked blank spaces in numPad/opPad
        keyValue = e.target.dataset.key; // get key from clicked btn
        if(keyValue !== "Escape") {
            if( keyValue === "Backspace" ) {
                undoLastEntry(); // remove last input
            }
            else {
                updateCalcDisplay(); //update display and running input
            }
        }
        else {
            clearCalcDisplay(); //reset everything
        }
    };
};

//find which key "pressed" by keydown event, update display,
//update running computing input as needed
function findPressedKey(e) {
    try {
        //find key from keydown event, add styling
        pressedKey = document.querySelector(`div[data-key="${e.key}"`);
        if(pressedKey.classList.contains("numberPad")) {
            pressedKey.classList.add("clickedNum");
        }
        if(pressedKey.classList.contains("operator")) {
            pressedKey.classList.add("clickedOperator");
            pressedKey.addEventListener("transitionend", removeOpClickStyle);
        }
        keyValue = pressedKey.dataset.key; // get key value from pressed key
        clearKey = document.querySelector(".clear"); // ID the clear btn on numPad
        if( e.key === "Escape") {
            pressedKey = clearKey; // esc key is clear key
            keyValue = pressedKey.dataset.key; // get key value from esc key
            clearCalcDisplay(); // reset everything
        }
        else if( e.key === "Backspace" ) {
            undoLastEntry(); // remove last character from display & computing input
        }
        else {
            updateCalcDisplay(); //update calc display & running computing input
        }
    }
    catch(TypeError) {
        enterKey = document.querySelector(".equals");
        if( e.key === "Enter") {
            pressedKey = enterKey;
            pressedKey.classList.add("clickedOperator");
            
            keyValue = pressedKey.dataset.key;
            updateCalcDisplay();
        }
        return;
    };
};

let newOperator = ""; //designates operator received as input

//update calc display & perform calculation:
function updateCalcDisplay() {
    if( keyValue != '=' ) {
        if( keyValue === "+" || keyValue === "-" || 
                keyValue === "*" || keyValue === "/") {
            displayText.textContent = ""; //clear display for next number
            newOperator = keyValue; // keyValue is newOperator
        }
        else {
            displayText.textContent += keyValue; //add new character to display
        }
        updateComputingInput(); //add received character to running input str
        //note: operators are added to running computing input, not to display
    }
    else {
        if( isDividingByZero(computingInput) ) {
            xFilesTheme.currentTime = 0.5; //return audio to start point
            xFilesTheme.play(); //play auido
            displayArea.classList.add("gifContainer"); //show math gif
            displayText.textContent = ""; // clear display
            return; // exit
        }
        //calculate result, round to 2 decimals places
        result = Math.round(convertToOperation(computingInput) * 100) / 100;
        if( isNaN(result) ) {
            displayText.textContent = "Cannot compute..."; //error message
        }
        else {
            displayText.textContent = result; //update display with result
        }
    };
};

//concatenate newly received input with running input str
function updateComputingInput() {
    computingInput += keyValue;
};

//Clear calc obj and calc display:
function clearCalcDisplay() {
    displayText.textContent = ""; // clear display
    computingInput = ""; //clear running input str
    computingObj = {}; //clear computing obj

    //remove any remaining btn or display area styling
    for( opBtn of operatorBtns) {
        if( opBtn.classList.contains("clickedOperator") ) {
            opBtn.classList.remove("clickedOperator");
        }
    };
    if( displayArea.classList.contains("gifContainer") ) {
        displayArea.classList.remove("gifContainer");
    }
    xFilesTheme.pause(); // stop audio if still playing
};

//Remove last input/char from display & running input:
function undoLastEntry() {
    //break current input str into array
    let currentText = displayText.textContent.split("");
    currentText.pop(); //remove last character
    displayText.textContent = currentText.join(""); // update display
    //break current computing input into array
    let currentComputingInput = computingInput.split("");
    currentComputingInput.pop(); //remove last character
    computingInput = currentComputingInput.join(""); //update computing input
};