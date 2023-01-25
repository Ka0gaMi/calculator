let shouldResetScreen = false
let firstNumber = ""
let secondNumber = ""
let currentOperation = null

const operatorButtons = document.querySelectorAll("#operator");
const numberButtons = document.querySelectorAll("#number");
const clearButton = document.getElementById("clearBtn");
const decimalButton = document.getElementById("decimalBtn");
const equalButton = document.getElementById("equalBtn");
const plusMinusButton = document.getElementById("plusMinusBtn");
const percentButton = document.getElementById("percentBtn");
const pastActionScreen = document.getElementById("past-action");
const currentActionScreen = document.getElementById("current-action");

equalButton.addEventListener("click", evaluate)
clearButton.addEventListener("click", clear)
decimalButton.addEventListener("click", appendDecimal)

percentButton.addEventListener("click", () => 
    currentActionScreen.textContent = percent(currentActionScreen.textContent)
)

plusMinusButton.addEventListener("click", () => 
    currentActionScreen.textContent = plusMinus(currentActionScreen.textContent)
)

operatorButtons.forEach(operatorButtons => 
    operatorButtons.addEventListener("click", () => 
        setOperator(operatorButtons.textContent))
)

numberButtons.forEach(numberButtons => 
    numberButtons.addEventListener("click", () => 
        appendNumber(numberButtons.textContent))
)

function evaluate() {
    if (currentOperation === null || shouldResetScreen) {
        return;
    }
    if (currentOperation === "÷" && currentActionScreen.textContent === "0") {
        alert("Division by 0 is prohibited!")
        return;
    }
    secondNumber = currentActionScreen.textContent;
    currentActionScreen.textContent = resultRound(
        operate(currentOperation, firstNumber, secondNumber)
    )
    pastActionScreen.textContent = `${firstNumber} ${currentOperation} ${secondNumber} =`
    currentOperation = null
}

function resultRound(number) {
    return Math.round(number * 100000) / 100000
}

function appendNumber(number) {
    if (currentActionScreen.textContent === "0" || shouldResetScreen) {
        resetScreen()
    }
    currentActionScreen.textContent += number
}

function resetScreen() {
    currentActionScreen.textContent = "";
    shouldResetScreen = false
}

function clear() {
    currentActionScreen.textContent = "0";
    pastActionScreen.textContent = "";
    firstNumber = "";
    secondNumber = "";
    currentOperation = null
}

function setOperator(operator) {
    if (currentOperation !== null) {
        evaluate();
    }
    firstNumber = currentActionScreen.textContent;
    currentOperation = operator;
    pastActionScreen.textContent = `${firstNumber} ${currentOperation}`;
    shouldResetScreen = true
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b
}

function plusMinus(a) {
    return a * -1
}

function percent(a) {
    return a / 100
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "÷":
            if (b === 0) {
                return null;
            } else {
                return divide(a, b);
            }
        case "×":
            return multiply(a, b);
        case "+/-":
            return plusMinus(a);
        case "%":
            return percent(a);
        default:
            return null
    }
}

function showNumberOnScreen(number) {

}

function appendDecimal() {
    if (shouldResetScreen) {
        resetScreen();
    }
    if (currentActionScreen.textContent === "") {
        currentActionScreen.textContent = "0";
    }
    if (currentActionScreen.textContent.includes(".")) {
        return;
    }
    currentActionScreen.textContent += "."
}