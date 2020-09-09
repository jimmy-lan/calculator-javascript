// Global variables
let calculationValues = [0];
let operatorValue = "";
let shouldRetype = false;

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
};

// Helper Functions
function sendNumber(number) {
  if (operatorValue && shouldRetype) {
    calculatorDisplay.textContent = number;
    calculationValues[1] = Number(number);
    shouldRetype = false;
  } else {
    const oldDisplayValue = calculatorDisplay.textContent;
    const newDisplayValue =
      oldDisplayValue === "0" ? number : oldDisplayValue + number;
    calculatorDisplay.textContent = newDisplayValue;
    if (operatorValue) {
      calculationValues[1] = Number(newDisplayValue);
    } else {
      calculationValues[0] = Number(newDisplayValue);
    }
  }
}

function useOperator(operator) {
  shouldRetype = true;

  if (calculationValues.length === 1) {
    operatorValue = operator;
    return;
  }

  // calculate result
  let result = calculate[operatorValue](
    calculationValues[0],
    calculationValues[1]
  );

  // round result to eliminate floating point number precision error
  result = Math.round((result + Number.EPSILON) * 1000000) / 1000000;

  calculationValues = [result];
  operatorValue = operator;

  calculatorDisplay.textContent = result;
}

function resetDisplay() {
  calculationValues = [0];
  operatorValue = "";
  calculatorDisplay.textContent = "0";
}

function addDecimal() {
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent += ".";
  }
}
