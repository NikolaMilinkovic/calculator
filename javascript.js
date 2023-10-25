// =====================[ELEMENT SELECTORS]===================== //
const displayMain = document.getElementById('display-main');
// ============================================================= //


// Function that adds event listeners to numbers
for (let i = 0; i <= 9; i++) {
    const btn = document.getElementById('btn' + i);
    btn.addEventListener('click', () => {
     displayMain.innerHTML += i;
    });
  }

let toggleOperator = 0;
function resetToggleOperator(){
    toggleOperator = 0;
}

// Function that checks for '-' as first character and triggers resetToggleOperator()
// Allows us to add another operator
// Functionality if the first number is negative
let negativeNumChecker = 0;
function resetNegativeNumChecker(){
    negativeNumChecker = 0;
}
function checkNegativeNumber(){
    let tempArray = displayMain.textContent.split(' ');
    if (tempArray[1]==='-' && negativeNumChecker===0){
        resetToggleOperator();
        negativeNumChecker++;
    }
    else{
        return;
    }
}

const operators = ['÷','x','-','+','√','^'];
// Function that adds event listeners to operators
for (let i = 10; i<=15; i++){
    const btn = document.getElementById('btn' + i)
    .addEventListener('click', () => {
        checkNegativeNumber();
        if(toggleOperator === 1){
            return;
        }
        displayMain.innerHTML += ' ' + operators[i-10] + ' ';
        resetDecimalToggle();
        toggleOperator = 1;
    })
}

// Backspace button logic and event listener
const btnBackspace = document.getElementById('btnBackspace')
.addEventListener('click', () => {
    let tempText = displayMain.textContent.slice(-1);
    let displayText = displayMain.textContent;
    if(tempText === '.') 
        resetDecimalToggle();
    if(tempText === ' '){
        displayText = displayMain.textContent.slice(0, -3);
        resetToggleOperator();
    }
    else{
        displayText = displayMain.textContent.slice(0, -1);
    }
 displayMain.innerHTML = displayText;
});

// AC - All Clear button logic and event listener
const btnClear = document.getElementById('btnClear')
.addEventListener('click', () => {
 displayMain.innerHTML = '';
    displayMain.innerHTML= '';
    resetDecimalToggle();
    resetToggleOperator();
    resetNegativeNumChecker();
});

// '.' Decimal button ligic and event listener
let decimalToggle = 0;
function resetDecimalToggle(){
    decimalToggle = 0;
}

const btnDecimal = document.getElementById('btnDecimal')
.addEventListener('click', () => {
    if (decimalToggle === 0){
        let tempText = displayMain.textContent.slice(-1);
        for(i=0; i<=5; i++){
            if(tempText === operators[i])
                return;
        }
        if(tempText === '' || displayMain.textContent.slice(-1) === ' '){
         displayMain.innerHTML += '0.';
            decimalToggle++;
        }
        else{
         displayMain.innerHTML += '.';
            decimalToggle++;
        }
    }
    else
        return;
});

// btnCalculate logic and event listener
const btnCalculate = document.getElementById('btnCalculate')
.addEventListener('click', () => {
    let tempArray = displayMain.textContent.split(' ');

    // Logic for first negative number
    // Take out first two array elements, combine them place in new array
    // Combine with main array = tempArray
    if (tempArray.length === 5){
        tempArray.shift();
        const negativeChar = [];
        for(i=0; i<tempArray.length-2;i++){
            if (tempArray[i] === '-' && !isNaN(tempArray[i + 1])) {
                negativeChar.push(tempArray[i] + tempArray[i + 1]);
            }
        }
        tempArray.splice(0,2);
        tempArray = negativeChar.concat(tempArray);
    }

    switch(tempArray[1]){
        case '÷':
            displayMain.textContent = checkDecimals(parseFloat(tempArray[0]) / parseFloat(tempArray[2]));
            resetDecimalToggle();
            resetToggleOperator();
            resetNegativeNumChecker();
        break;
        case 'x':
         displayMain.textContent = parseFloat(tempArray[0]) * parseFloat(tempArray[2]);
            resetDecimalToggle();
            resetToggleOperator();
            resetNegativeNumChecker();
        break;
        case '-':
         displayMain.textContent = parseFloat(tempArray[0]) - parseFloat(tempArray[2]);
            resetDecimalToggle();
            resetToggleOperator();
            resetNegativeNumChecker();
        break;
        case '+':
         displayMain.textContent = parseFloat(tempArray[0]) + parseFloat(tempArray[2]);
            resetDecimalToggle();
            resetToggleOperator();
            resetNegativeNumChecker();
        break;
        case '√':
            if(tempArray[0] === ''){
                displayMain.textContent = checkDecimals(Math.sqrt(parseFloat(tempArray[2])));
            }
            else{
                displayMain.textContent = checkDecimals(Math.pow(parseFloat(tempArray[0]), 1/parseFloat(tempArray[2])));  
            }
            resetDecimalToggle();
            resetToggleOperator();
            resetNegativeNumChecker();
        break;
        case '^':
         displayMain.textContent = checkDecimals(Math.pow(parseFloat(tempArray[0]), parseFloat(tempArray[2])));
            resetDecimalToggle();
            resetToggleOperator();
            resetNegativeNumChecker();
        break;
    }   
});

// Function that rounds number on 2 decimals if they contain .
function checkDecimals(number){
    if(number.toString().includes('.'))
        return number.toFixed(2);
    else
        return number;
}

// Keyboard click event listener
window.addEventListener('keydown', function (e) {
    const btn = document.querySelector(`button[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    key.classList.add('clicked');
    btn.click();
});

// Click event listener
document.addEventListener('click', function (e) {
    const target = e.target;
    if (target.tagName === 'BUTTON') {
        const audio = document.querySelector(`audio[data-key="${document.getElementById('btn13').getAttribute('data-key')}"]`);
        audio.volume = 0.2;
        audio.currentTime = 0;
        audio.play();
    }
});

// Funkcija za sklanjanje clicked klase nakon zavrsenog propertija Transform
// Function that removes clicked class after Transform finishes
function removeTransition(e){
    if(e.propertyName !== 'transform') return;
    console.log(e.propertyName);
    this.classList.remove('clicked');
}
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));