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