// // Set current year dynamically
// document.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("current-year").textContent = new Date().getFullYear();
// });
// Redirect to the reproductive health page
function goToReproductivePage() {
  window.location.href = "../reproductive/reproductive.html";
}
function goToMentalPage() {
  window.location.href = "../mental/mental.html";
}
// Dynamic current year in footer
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("current-year").textContent = new Date().getFullYear();
});
function goToChatbotPage() {
  window.location.href = "../chatbot/chatbot.html";
}
function goToAsapPage() {
  window.location.href = "../ASAP/asap.html";
}

function goToRehabilitationPage() {
  window.location.href = "../Rehabilitation/Rehabilitation.html";
}