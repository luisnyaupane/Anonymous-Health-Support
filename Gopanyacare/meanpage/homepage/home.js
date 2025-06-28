// // Set current year dynamically
// document.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("current-year").textContent = new Date().getFullYear();
// });
// Redirect to the reproductive health page
// function goToReproductivePage() {
//   window.location.href = "../reproductive/reproductive.html";
// }
// function goToMentalPage() {
//   window.location.href = "../mental/mental.html";
// }
// // Dynamic current year in footer
// document.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("current-year").textContent = new Date().getFullYear();
// });
// function goToChatbotPage() {
//   window.location.href = "../chatbot/chatbot.html";
// }
// function goToAsapPage() {
//   window.location.href = "../ASAP/asap.html";
// }

// function goToRehabilitationPage() {
//   window.location.href = "../Rehabilitation/Rehabilitation.html";
// }
// Dynamic current year in footer
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("current-year").textContent = new Date().getFullYear();

  // Get userId from URL params
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("id");

  if (userId) {
    // Store userId locally for future use (optional)
    localStorage.setItem("userId", userId);

    // Show welcome message at top of container
    const container = document.querySelector(".container");
    if (container) {
      const welcomeMsg = document.createElement("p");
      welcomeMsg.textContent = `Welcome, your anonymous ID is: ${userId}`;
      welcomeMsg.className = "text-teal-400 text-lg mb-6";
      container.insertBefore(welcomeMsg, container.firstChild);
    }
  } else {
    // Redirect to login page if no userId
    window.location.href = "../anonymous.html";
  }
});

// Redirect to the reproductive health page
function goToReproductivePage() {
  window.location.href = "../reproductive/reproductive.html";
}

function goToMentalPage() {
  window.location.href = "../mental/mental.html";
}

function goToChatbotPage() {
  window.location.href = "../chatbot/chatbot.html";
}

function goToAsapPage() {
  window.location.href = "../ASAP/asap.html";
}

function goToRehabilitationPage() {
  window.location.href = "../Rehabilitation/Rehabilitation.html";
}
