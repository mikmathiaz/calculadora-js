let displayValue = "0";
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

const display = document.querySelector("#display");

function updateDisplay() {
  display.textContent = displayValue;
}

updateDisplay();

const buttonsContainer = document.querySelector(".buttons");
buttonsContainer.addEventListener("click", (event) => {
  const { target } = event;
  const { value } = target;

  if (!target.matches("button")) {
    return;
  }

  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperator(value);
      break;
    case ".":
      inputDecimal(value);
      break;
    case "C":
      resetCalculator();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});

function inputDigit(digit) {
  if (waitingForSecondOperand === true) {
    displayValue = digit;
    waitingForSecondOperand = false;
  } else {
    displayValue = displayValue === "0" ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (waitingForSecondOperand === true) {
    displayValue = "0.";
    waitingForSecondOperand = false;
    return;
  }

  if (!displayValue.includes(dot)) {
    displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(displayValue);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstOperand = result;
  }

  waitingForSecondOperand = true;
  operator = nextOperator;

  if (nextOperator === "=") {
    operator = null;
  }
}

function calculate(first, second, op) {
  if (op === "+") {
    return first + second;
  } else if (op === "-") {
    return first - second;
  } else if (op === "*") {
    return first * second;
  } else if (op === "/") {
    return first / second;
  }
  return second;
}

function resetCalculator() {
  displayValue = "0";
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
}
