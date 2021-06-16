const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = calculator.querySelector('.calculator__display')


keys.addEventListener('click', event => {
    const  displayValue = display.textContent
    const key = event.target
    const keyValue = key.textContent
    const { type } = key.dataset
    const { previousKeyType }   = calculator.dataset
    

    // is this a number key
    if (type === 'number') {
            if(displayValue === '0'){
                display.textContent = keyValue
             } else if (previousKeyType === 'operator') {
                display.textContent = keyValue
             } else {
                display.textContent = displayValue + keyValue
                
    }; calculator.dataset.previousKeyType = type
    }


    // is this an operation key
    if (type === 'operator') {
        const operatorKeys = keys.querySelectorAll('[data-type="operator"]')
        operatorKeys.forEach(el => [el.dataset.state=''])
        console.log(operatorKeys)
        key.dataset.state = 'selected'
        calculator.dataset.previousKeyType = type

        calculator.dataset.firstNumber = displayValue
        calculator.dataset.operator = key.dataset.key
    }

    if (type === 'equal'){
        const firstNumber = calculator.dataset.firstNumber  
        const operator = calculator.dataset.operator
        const secondNumber =  displayValue
        console.log(firstNumber, operator, secondNumber) 

        display.textContent = calculate(firstNumber, operator, secondNumber)
    }

    calculator.dataset.previousKeyType = type
})

function calculate (firstNumber, operator, secondNumber){
    firstNumber = parseInt(firstNumber)
    secondNumber = parseInt(secondNumber)

    let result = ''
    if (operator === 'plus') result = firstNumber + secondNumber
    if (operator === 'minus') result = firstNumber - secondNumber
    if (operator === 'times') result = firstNumber * secondNumber
    if (operator === 'divide') result = firstNumber / secondNumber
    return result

}