const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previus-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);
let currentOperand = "";
let previousOperand = "";
let operation = undefined;

numberButtons.forEach((number) => {
  number.addEventListener("click", function () {
    appendNumber(number.innerText);
    updateDisplay();
  });
});

operationButtons.forEach((operand) => {
  operand.addEventListener("click", function () {
    chooseOperation(operand.innerText);
    updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  compute();
  updateDisplay();
});

deleteButton.addEventListener("click", function () {
  deleteOne();
  updateDisplay();
});

allClearButton.addEventListener("click", function () {
  allClear();
  updateDisplay();
});

function deleteOne() {
  if (currentOperand === "") return;
  currentOperand = currentOperand.toString().slice(0, -1);
}

function allClear() {
  currentOperand = "";
  previousOperand = "";
  operation = undefined;
}

function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperation(simbol) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    compute();
  }
  operation = simbol;
  previousOperand = currentOperand;
  currentOperand = "";
}
function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      if (current === 0) return;
      computation = prev / current;
      break;
    default:
      return;
  }
  currentOperand = computation;
  operation = undefined;
  previousOperand = "";
}

function getDisplayNumber(number) {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split(".")[0]);
  const decimalDigits = stringNumber.split(".")[1];
  let integerDisplay;
  if (isNaN(integerDigits)) {
    integerDisplay = "";
  } else {
    integerDisplay = integerDigits.toLocaleString("en", {
      maximumFractionDigits: 0,
    });
  }
  if (decimalDigits != null) {
    return integerDisplay + "." + decimalDigits;
  } else {
    return integerDisplay;
  }
}

function updateDisplay() {
  currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
  if (operation != null) {
    previousOperandTextElement.innerText =
      getDisplayNumber(previousOperand).toString() + " " + operation.toString();
  } else {
    previousOperandTextElement.innerText = "";
  }
}
