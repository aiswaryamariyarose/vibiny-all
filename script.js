
const API_KEY = "Your API key";  // Replace with actual API key

// Handle form submission
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("inputForm");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const occasion = document.getElementById("Occasion").value;
            const mood = document.getElementById("Mood").value;
            const colorCode = document.getElementById("colorCode").value;
            const description = document.getElementById("description").value;

            if (!occasion || !mood || !description) {
                alert("Please fill in all fields!");
                return;
            }

            const userInput = { occasion, mood, colorCode, description };
            localStorage.setItem("userInput", JSON.stringify(userInput));

            // Redirect to output page
            window.location.href = "output.html";
        });
    }

    // Handle output display
    const outputText = document.getElementById("outputText");
    if (outputText) {
        const userInput = JSON.parse(localStorage.getItem("userInput"));
        if (userInput) {
            fetchGeminiResponse(userInput);
        } else {
            outputText.textContent = "No data found. Please submit your input.";
        }




