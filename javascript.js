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

const operators = ['÷','x','-','+'];
let toggleOperator = 0;
function resetToggleOperator(){
    toggleOperator = 0;
}
// Function that adds event listeners to operators
for (let i = 10; i<=13; i++){
    const btn = document.getElementById('btn' + i)
    .addEventListener('click', () => {
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

['÷','x','-','+']
// btnCalculate logic and event listener
const btnCalculate = document.getElementById('btnCalculate')
.addEventListener('click', () => {
    let tempArray = displayMain.textContent.split(' ');
    switch(tempArray[1]){
        case '÷':
            const result = parseFloat(tempArray[0]) / parseFloat(tempArray[2]);
            if(result.toString().includes('.'))
             displayMain.textContent = result.toFixed(2);
            else
             displayMain.textContent = result;
            resetDecimalToggle();
            resetToggleOperator();
        break;
        case 'x':
         displayMain.textContent = parseFloat(tempArray[0]) * parseFloat(tempArray[2]);
            resetDecimalToggle();
            resetToggleOperator();
        break;
        case '-':
         displayMain.textContent = parseFloat(tempArray[0]) - parseFloat(tempArray[2]);
            resetDecimalToggle();
            resetToggleOperator();
        break;
        case '+':
         displayMain.textContent = parseFloat(tempArray[0]) + parseFloat(tempArray[2]);
            resetDecimalToggle();
            resetToggleOperator();
        break;
    }   
});