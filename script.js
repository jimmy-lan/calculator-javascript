// Global variables
let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

// Selectors
const calculatorDisplay = document.querySelector(".calculator h1");
const inputButtons = document.querySelectorAll(".calculator-buttons button");
const btnClear = document.getElementById("btn-clear");

// Event Listeners
btnClear.addEventListener("click", resetDisplay);

inputButtons.forEach((inputButton) => {
  if (inputButton.classList.contains("number")) {
    inputButton.addEventListener("click", () => {
      sendNumber(inputButton.value);
    });
  } else if (inputButton.classList.contains("operator")) {
    inputButton.addEventListener("click", () => {
      useOperator(inputButton.value);
    });
  } else if (inputButton.classList.contains("decimal"))
    inputButton.addEventListener("click", addDecimal);
});

// Calculation object
const calculate = {
  "/": (a, b) => a / b,
  "*": (a, b) => a * b,
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "=": (a, b) => b,
};

// Helper Functions
function sendNumber(number) {
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function useOperator(operator) {
  if (operatorValue && awaitingNextValue) {
    operatorValue = operatorValue;
    return;
  }

  const currentValue = Number(calculatorDisplay.textContent);
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const result = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = result;
    firstValue = result;
  }
  awaitingNextValue = true;
  operatorValue = operator;
}

function resetDisplay() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}

function addDecimal() {
  // Do not add decimal point when an operator is pressed
  if (awaitingNextValue) return;

  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent += ".";
  }
}
