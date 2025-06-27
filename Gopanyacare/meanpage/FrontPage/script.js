function chooseMode(mode) {
  if (mode === 'anonymous') {
    window.location.href = '../safePopUP/safepopup.html';
  } else if (mode === 'identified') {
    window.location.href = '../loginpage/identyLogin.html';
  }
}

let showingFirst = true;

setInterval(() => {
  const bg1 = document.getElementById('bg1');
  const bg2 = document.getElementById('bg2');

  if (showingFirst) {
    bg1.style.opacity = 0;
    bg2.style.opacity = 1;
  } else {
    bg1.style.opacity = 1;
    bg2.style.opacity = 0;
  }

  showingFirst = !showingFirst;
}, 4000); // 🔧 Change background every 6 seconds
