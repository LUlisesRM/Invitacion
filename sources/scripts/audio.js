// Restablece el scroll al recargar
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

window.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('bg-music');
  const modal = document.getElementById('intro-modal');
  const muteBtn = document.getElementById('mute-toggle');

  // Mostrar invitación al hacer clic en el modal
  modal.addEventListener('click', () => {
    modal.classList.add('fade-out');

    const playPromise = music.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Reproducción automática activada por usuario.");
          muteBtn.style.display = 'block'; // Mostrar botón de mute
          updateMuteIcon(); // Asignar ícono correcto
        })
        .catch((error) => console.warn("Error al reproducir audio: ", error));
    }

    setTimeout(() => {
      modal.style.display = 'none';
    }, 1000);
  });

  // Alternar mute y actualizar ícono
  muteBtn.addEventListener('click', () => {
    music.muted = !music.muted;
    updateMuteIcon();
  });

  function updateMuteIcon() {
    muteBtn.classList.toggle('muted', music.muted);
    muteBtn.classList.toggle('unmuted', !music.muted);
  }
});
