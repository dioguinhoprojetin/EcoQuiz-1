// Function to calculate and display the images
function displayImages() {
    const inputValue = document.getElementById("numberInput").value; // Get the value from the input field
    
    if (inputValue === "") {
      alert("Please enter a number.");
      return;
    }
  
    // Convert input to a number and calculate the result
    const result = (inputValue * 13 * 365) / 25;
  
    // Get the container where images will be displayed
    const imagesContainer = document.getElementById("imagesContainer");
  
    // Clear the container before adding new images
    imagesContainer.innerHTML = "";
  
    // Create and display images based on the calculated result
    for (let i = 0; i < result; i++) {
      const imgElement = document.createElement("img");
      imgElement.src = "images/gallon.png"; // Placeholder image, change to your image URL
      imgElement.alt = "Image " + (i + 1);
      imagesContainer.appendChild(imgElement);
    }
  }
  