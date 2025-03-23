const API_KEY = "AIzaSyCSMCVWg3EYp4rZ7031w6QEcTtALmGNaQY";  // Replace with actual API key

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
    }

    // Copy button functionality
    const copyBtn = document.getElementById("copyBtn");
    if (copyBtn) {
        copyBtn.addEventListener("click", function () {
            navigator.clipboard.writeText(outputText.textContent)
                .then(() => alert("Copied to clipboard!"))
                .catch(err => console.error("Copy failed", err));
        });
    }
});

// Function to fetch response from Gemini API
async function fetchGeminiResponse(userInput) {
    const outputText = document.getElementById("outputText");
    
    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=AIzaSyDKeG-5zmORs50OMQWEKBui7nssjRvwfi8", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: `Generate a personalized outfit recommendation for the following input:
                Occasion: ${userInput.occasion}
                Mood: ${userInput.mood}
                Color Code: ${userInput.colorCode}
                Description: ${userInput.description}`,
                maxTokens: 100
            })
        });

        const data = await response.json();
        print(data)
        outputText.textContent = data.candidates[0].text || "Error fetching response";
    } catch (error) {
        outputText.textContent = "Failed to fetch response. Try again.";
        console.error("Error:", error);
    }
}
