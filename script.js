const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const equalButton = document.querySelector('.equalBtn')
const backspace = document.querySelector('.item-backspace')
const clear = document.querySelector('.ce')
const currentOperationScreen = document.querySelector('.current-operation')
const previousOperationScreen = document.querySelector('.previous-operation')
const pointBtn = document.querySelector('.point')

let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false



numbers.forEach(number => 
    number.addEventListener("click", () => appendNumber(number.textContent))
)

operators.forEach(operator =>
    operator.addEventListener("click", () => appendOperator(operator.textContent))
)

equalButton.addEventListener('click', equalRes)
pointBtn.addEventListener('click', pointAppend)
backspace.addEventListener('click', del)
clear.addEventListener('click', clearAll)



function clearAll(){
    currentOperationScreen.textContent = '0'
    previousOperationScreen.textContent = ''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
    
}

function appendNumber(number){
    if (currentOperationScreen.textContent === '0' || shouldResetScreen){
        resetScreen()
    }
    currentOperationScreen.textContent += number

}

function appendOperator(operator){
    if (currentOperation !== null){
        equalRes()
    }
    firstOperand = currentOperationScreen.textContent
    currentOperation = operator
    previousOperationScreen.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
    
}

function pointAppend(){
    if(shouldResetScreen) {
        resetScreen()
    }
    if(currentOperationScreen.textContent === ''){
        currentOperationScreen.textContent = '0'
    }
    if (currentOperationScreen.textContent.includes('.')){
        return currentOperationScreen.textContent += '.'
    }
}

function resetScreen(){
    currentOperationScreen.textContent = ''
    shouldResetScreen = false

}

function del(){
    currentOperationScreen.textContent = currentOperationScreen.textContent
    .toString()
    .slice(0, -1)
}

function equalRes(){
    if (currentOperation === null || shouldResetScreen) return
    if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
      alert("You can't divide by 0!")
      return
    }
    secondOperand = currentOperationScreen.textContent
    currentOperationScreen.textContent = roundRes(
      compute(firstOperand, currentOperation, secondOperand)
    )
    previousOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
  }

function roundRes(number){
    return Math.round(number * 1000) / 1000
}


function add(firstValue, secondValue){
    return firstValue + secondValue

}

function sub(firstValue, secondValue){
    return firstValue - secondValue
}

function mul(firstValue, secondValue){
    return firstValue * secondValue
}

function divide(firstValue, secondValue){
    return firstValue / secondValue
}



function compute(firstValue, operator, secondValue){

    a = Number(firstValue)
    b = Number(secondValue)

    switch (operator) {
        case '+':
          return add(a, b)
        case '-':
          return sub(a, b)
        case '*':
          return mul(a, b)
        case '÷':
          if (b === 0) return null
          else return divide(a, b)
        default:
          return null
    }
}

