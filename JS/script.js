class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) {
      return;
    }
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    //Not more than 1 pair of numbers
    if (this.currentOperand === "") {
      return;
    }
    if (this.previuosOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) {
      return;
    }
    computation = this.operate(this.operation, prev, current);
    console.log(computation);
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    //display operator on previous operand
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    }
    else {
      this.previousOperandTextElement.innerText = "";
    }
  }
  add(number1, number2) {
    return number1 + number2;
  }
  subtract(number1, number2) {
    return number1 - number2;
  }
  multiply(number1, number2) {
    return number1 * number2;
  }
  divide(number1, number2) {
    return number1 / number2;
  }
  operate(operator, number1, number2) {
    let num1 = Number(number1);
    let num2 = Number(number2);
    switch (operator) {
      case "+":
        return this.add(num1, num2);
      case "-":
        return this.subtract(num1, num2);
      case "*":
        return this.multiply(num1, num2);
      case "/":
        return this.divide(num1, num2);
      default:
        return;
    }
  }
}

const numberKeys = document.querySelectorAll("[data-number]");
const operationKeys = document.querySelectorAll("[data-operator]");
const equalButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);
numberKeys.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationKeys.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});
clearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

///////////
/*
let storedNumber = "";
let clickedOperator = "";
let firstNumber = "";
let resultVariable = "";
result.textContent = 0;

numberKeys.forEach((number) => {
  number.addEventListener("click", function () {
    storedNumber += number.value;
    result.textContent += storedNumber;
    displayResult();
  });
});

operationKeys.forEach((operator) => {
  operator.addEventListener("click", function () {
    if (firstNumber && storedNumber) {
      displayResult();
    }
    // save the first number
    firstNumber = storedNumber;

    // get the operator that was clicked
    clickedOperator = operator.textContent;
    equation.textContent = storedNumber + clickedOperator;
    storedNumber = '';

    console.log('FirstNumber' + firstNumber + 'Stored' + storedNumber)
    console.log(clickedOperator);

  })
});
equalsKey.addEventListener('click', function() {
  displayResult();
});
function displayResult() {
  result = operate(parseFloat(firstNumber), parseFloat(storedNumber), clickedOperator)
  // update content of current operation with result and previous operand with the calculation, make storedNumber = result
  result.textContent = result;
  equation.textContent = firstNumber + ' ' + clickedOperator + ' ' + storedNumber;
  storedNumber = result;
  console.log('FirstNumber' + firstNumber + 'Stored' + storedNumber);
}

function operation() {
  let buttonText = this.innerText;
  if (buttonText === "AC") {
    equation.innerText = "";
    result.innerText = "0";
    return;
  }
  if (buttonText === "DEL") {
    equation.textContent = equation.textContent.substring(
      0,
      equation.textContent.length - 1
    );
    return;
  }
  if (buttonText === "=") {
    result.innerText = eval(equation.innerText);
  } else {
    equation.textContent += buttonText;
    return;
  }

  //
  if (operator == "add") {
    add(number1, number2);
  }
  if (operator == "subtract") {
    subtract(number1, number2);
  }
  if (operator == "multiply") {
    multiply(number1, number2);
  }
  if (operator == "divide") {
    divide(number1, number2);
  }
}
*/
