// audio.js
window.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('bg-music');
  const muteBtn = document.getElementById('mute-toggle');

  window.reproducirMusica = function () {
    const playPromise = music.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Reproducción automática activada por usuario.");
          muteBtn.style.display = 'block';
          actualizarIconoMute();
        })
        .catch((error) => {
          console.warn("Error al reproducir audio:", error);
        });
    }
  };

  muteBtn.addEventListener('click', () => {
    music.muted = !music.muted;
    actualizarIconoMute();
  });

  function actualizarIconoMute() {
    muteBtn.classList.toggle('muted', music.muted);
    muteBtn.classList.toggle('unmuted', !music.muted);
  }
});
