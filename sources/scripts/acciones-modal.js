window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('intro-modal');
  const seal = document.getElementById('seal');

  document.body.classList.add('modal-open');

  // Detectar clic en toda la pantalla, incluyendo el sello
  modal.addEventListener('click', () => {
    animarSealYContinuar();
  });

  function animarSealYContinuar() {
    // Agregar clase de "pop" al sello
    if (seal) {
      seal.classList.add('clicked');
      setTimeout(() => {
        seal.classList.remove('clicked');
      }, 300);
    }

    // Ejecutar funciones de cierre
    cerrarModal();

    if (typeof window.reproducirMusica === 'function') {
      window.reproducirMusica();
    }
  }

  function cerrarModal() {
    window.scrollTo({ top: 0, behavior: 'auto' });

    modal.classList.add('fade-out');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }, 1000);
  }
});

setTimeout(() => {
  const guide = document.getElementById('guide-overlay');
  const seal = document.getElementById('seal');
  const lottieGuide = document.getElementById('lottie-guide');

  if (guide && seal && lottieGuide) {
    guide.classList.add('visible');

    // Obtener posición del sello
    const sealRect = seal.getBoundingClientRect();

    // Posicionar la animación sobre el sello
    lottieGuide.style.top = `${sealRect.top + window.scrollY-10}px`;
    lottieGuide.style.left = `${sealRect.left + window.scrollX + (sealRect.width / 2) - 126}px`; // centrado horizontal, ancho/2 - mitad del guide

    // Cargar Lottie
    lottie.loadAnimation({
      container: lottieGuide,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'sources/animations/click-hand.json'
    });


    // Después de 2 segundos, iniciar animación intermitente
    setTimeout(() => {
      lottieGuide.style.animation = 'fadeLoop 3s ease-in-out infinite';
    }, 2000);


    // Ocultar al hacer clic manual
    guide.addEventListener('click', (e) => {
      guide.classList.remove('visible');
      clearTimeout(autoClose);
    });
  }
}, 2000);





