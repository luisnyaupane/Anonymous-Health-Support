document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const targetUrl = card.getAttribute('data-target');
      if(targetUrl) {
        window.location.href = targetUrl;
      }
    });
  });
});
function goToAssessmentPage() {
  window.location.href = "./MentalAssessment/assessment.html";
}
function goToHelplinePage() {
  window.location.href = "./healpLine/healpLine.html";
}
function goToMedicalhelpPage() {
  window.location.href = "./medicalHelp/medicalHelp.html";
}