function changeText() {
    // Get the user input
    const userInput = document.getElementById("userInput").value;
    const output = "With these amounts of plants you would have helped to reduce: " + userInput*1.5+ " kg of CO2 emissions per year!";
    // Change the paragraph text
    document.getElementById("displayText").innerText = output;
}

function changeText2() {
    // Get the user input
    const userInput2 = document.getElementById("userInput2").value;
    const output = "You spent " + userInput2*9+ " gallons of water per minute if you had used a Hose with no nozzle, but if you had used a nozzle you would have spent " + userInput2*20 + " gallons of water per minute!";

    // Change the paragraph text
    document.getElementById("displayText2").innerText = output;
}