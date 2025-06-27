// chat.js
// This script handles the chat functionality and API calls.

// Get references to DOM elements
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
const chatMessages = document.getElementById('chatMessages');

/**
 * Adds a message to the chat display.
 * @param {string} text - The content of the message.
 * @param {'user' | 'bot'} sender - The sender of the message ('user' or 'bot').
 */
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    if (sender === 'user') {
        messageDiv.classList.add('user-message');
    } else {
        messageDiv.classList.add('bot-message');
    }
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    // Scroll to the bottom to show the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Displays a loading indicator in the chat.
 */
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingIndicator';
    loadingDiv.classList.add('loading-indicator');
    loadingDiv.textContent = 'Thinking...';
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Removes the loading indicator from the chat.
 */
function hideLoading() {
    const loadingDiv = document.getElementById('loadingIndicator');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

/**
 * Sends the user's message to the Gemini API and displays the response.
 */
async function sendMessage() {
    const prompt = chatInput.value.trim();
    if (prompt === '') return; // Don't send empty messages

    addMessage(prompt, 'user'); // Display user's message
    chatInput.value = ''; // Clear input field
    showLoading(); // Show thinking indicator

    try {
        let chatHistory = [];
        // Structure the prompt for the Gemini API.
        // We're providing a clear instruction for the model to act as a health assistant.
        chatHistory.push({
            role: "user",
            parts: [{ text: `You are a helpful health assistant. Please provide concise and accurate health information. Respond only to health-related queries. If a query is not health-related, politely state that you can only answer health questions. User query: ${prompt}` }]
        });

        const payload = { contents: chatHistory };

        // IMPORTANT: If you are running this code locally (outside of the Canvas environment),
        // you MUST replace the empty string below with your actual Gemini API Key.
        // You can get one from Google AI Studio: https://aistudio.google.com/
        // For example: const apiKey = "YOUR_API_KEY_HERE";
        const apiKey = "AIzaSyAvouTj8KVpoB02Nqht8lch3U44tWtU3jQ"; // This will be automatically provided by the Canvas environment.

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        console.log("Sending API request to:", apiUrl);
        console.log("Payload:", payload);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        console.log("API response status:", response.status, response.statusText);

        if (!response.ok) {
            // Attempt to read the error body for more details
            const errorBody = await response.text();
            console.error(`API error: ${response.status} ${response.statusText}`, errorBody);
            addMessage(`Error ${response.status}: Could not get a response. Please check the console for details.`, 'bot');
            return; // Stop execution if response is not OK
        }

        const result = await response.json();
        console.log("Parsed API response:", result);

        if (result.error) {
            // Handle specific API error messages returned in the JSON
            console.error("API returned an error object:", result.error);
            addMessage(`API Error: ${result.error.message || 'An unknown API error occurred'}. Please try again later.`, 'bot');
        } else if (result.candidates && result.candidates.length > 0 &&
                   result.candidates[0].content && result.candidates[0].content.parts &&
                   result.candidates[0].content.parts.length > 0) {
            const botResponse = result.candidates[0].content.parts[0].text;
            addMessage(botResponse, 'bot');
        } else {
            // Fallback for unexpected but non-error API responses
            console.error("Unexpected API response structure or no content:", result);
            addMessage("Sorry, I couldn't get a clear response from the AI. The response structure was unexpected.", 'bot');
        }
    } catch (error) {
        console.error('Error fetching from Gemini API:', error);
        addMessage(`Oops! Something went wrong: ${error.message}. Please try again later.`, 'bot');
    } finally {
        hideLoading(); // Always hide loading indicator
    }
}

// Event listeners for sending messages
sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Initial welcome message when the page loads
document.addEventListener('DOMContentLoaded', () => {
    addMessage('Hello! How can I help you with your health questions today?', 'bot');
});
function goToHomePage() {
  window.location.href = "../homepage/home.html";
}