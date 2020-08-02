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
      sendNumber(inputButton.value);
    });
  } else if (inputButton.classList.contains("decimal"))
    inputButton.addEventListener("click", addDecimal);
});

// Helper Functions
function sendNumber(number) {
  const displayValue = calculatorDisplay.textContent;
  calculatorDisplay.textContent =
    displayValue === "0" ? number : displayValue + number;
}

function resetDisplay() {
  calculatorDisplay.textContent = "0";
}

function addDecimal() {
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent += ".";
  }
}
