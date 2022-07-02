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

/*
const operate = function(num1, num2, operation) {
    switch(operation) {
        case "+" : return add(num1, num2);
            break;
        case "-" : return subtract(num1, num2);
            break;
        case "*" : return multiply(num1, num2);
            break;
        case "/" : return divide(num1, num2);
            break;
    }
};
*/

//Operation variables, event listeners:
const numPad = document.querySelector(".numberPadContainer");
numPad.addEventListener("click", findKey);

const operatorPad = document.querySelector(".operatorContainer");
operatorPad.addEventListener("click", findKey);

const displayArea = document.querySelector(".calcDisplay");

window.addEventListener( "keydown", findPressedKey);

function findKey(e) {
    //console.log(e.target.attributes["data-key"]);
    console.log(e.target.dataset.key);
};

function findPressedKey(e) {
    //console.log(e);
    try {
        let pressedKey = document.querySelector(`div[data-key="${e.key}"`);
        //let displayText = document.createElement("p");
        //displayArea.appendChild(displayText);
        //displayText.textContent = pressedKey;
        console.log(pressedKey.dataset.key);
    }
    catch(TypeError) {
        let enterKey = document.querySelector(".equals");
        if( e.key === "Enter") {
            pressedKey = enterKey;
            console.log(pressedKey.dataset.key);
        }
        return;
    };
};