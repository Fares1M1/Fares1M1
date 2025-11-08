const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';
let previousInput = '';
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number') || button.classList.contains('decimal')) {
            currentInput += value;
            display.value = currentInput;
        } else if (button.classList.contains('operator')) {
            if (currentInput === '') return; // Prevent operator at the start
            if (previousInput !== '') calculate(); // Perform calculation if chaining operations
            previousInput = currentInput;
            operator = value;
            currentInput = '';
        } else if (button.classList.contains('equals')) {
            calculate();
        } else if (button.classList.contains('clear')) {
            currentInput = '';
            previousInput = '';
            operator = null;
            display.value = '';
        }
    });
});

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = curr !== 0 ? prev / curr : 'Error';
            break;
        default:
            return;
    }
    currentInput = result.toString();
    display.value = currentInput;
    previousInput = '';
    operator = null;
}