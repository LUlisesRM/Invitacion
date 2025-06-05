window.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('bg-music');
    const playPromise = music.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Reproducción automática exitosa.");
        })
        .catch((error) => {
          console.warn("Autoplay bloqueado. Esperando interacción del usuario.");
        });
    }
  });