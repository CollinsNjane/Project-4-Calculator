// Calculator class that can be used to create calculator object
class Calculator {
  //Constructor that initializes variables
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  //Method to clear the calculator display
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  //Method to delete a digit from the screen
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  //Method to add number before operation is done
  appendNumber(number) {
    //Don't repeat decimal points
    if (number === "." && this.currentOperand.includes(".")) {
      return;
    }
    //Don't repeat 0
    if (this.currentOperand === "0" && number !== ".") {
      return;
    }
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  //Method that chooses which operation, it assigns a value to previous operand
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
  //Method to add numbers
  add(number1, number2) {
    return number1 + number2;
  }
  //Method to subtract numbers
  subtract(number1, number2) {
    return number1 - number2;
  }
  //Method to multiply numbers
  multiply(number1, number2) {
    return number1 * number2;
  }
  //Method to divide numbers
  divide(number1, number2) {
    if (number2 == 0) {
      return "Error";
    } else {
      return number1 / number2;
    }
  }
  //Operate function that takes in an operator and 2 numbers and calculates the value accordingly
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
        //console.log(this.divide(num1, num2));
        return this.divide(num1, num2);
      default:
        return;
    }
  }
  //Method to compute the whole operation
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    //If the current or previous numbers are not numbers, break out of the compute method
    if (isNaN(prev) || isNaN(current)) {
      return;
    }
    //Has a bug that isNaN is produced if divided by 0
    computation = parseFloat(
      this.operate(this.operation, prev, current)
    ).toFixed(2); //Round to 2 decimal places
    //console.log(computation);
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
  //Update the display that is called after buttons are clicked
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    //display operator on previous operand
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}
//DOM variables
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
//A new calculator object
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);
//Event Listeners
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
