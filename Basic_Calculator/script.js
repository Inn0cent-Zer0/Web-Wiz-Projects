// Select the display element where the output will be shown
const display = document.querySelector(".display");

// Select all button elements
const buttons = document.querySelectorAll("button");

// Define an array of special characters used in calculations
const specialChars = ["%", "*", "/", "-", "+", "="];

// Initialize an empty string to store the current output
let output = "";

// Define a function to perform calculations based on the button clicked
const calculate = (btnValue) => {
  // Set focus on the display element
  display.focus();

  // If the button value is "=", evaluate the expression if output is not empty
  if (btnValue === "=" && output !== "") {
    // If the output contains '%', replace it with '/100' for percentage calculation
    output = eval(output.replace("%", "/100"));
  } 
  // If the button value is "AC", clear the output
  else if (btnValue === "AC") {
    output = "";
  } 
  // If the button value is "DEL", remove the last character from the output
  else if (btnValue === "DEL") {
    output = output.toString().slice(0, -1);
  } 
  // For any other button value
  else {
    // If the output is empty and the button value is a special character, do nothing
    if (output === "" && specialChars.includes(btnValue)) return;
    // Append the button value to the output
    output += btnValue;
  }

  // Update the display with the current output
  display.value = output;
};

// Add an event listener to each button
buttons.forEach((button) => {
  // On button click, call the calculate() function with the button's dataset value
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
