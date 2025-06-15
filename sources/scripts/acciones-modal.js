// acciones-modal.js
window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('intro-modal');
  const seal = document.getElementById('seal');

  // Bloquear scroll al cargar el modal
  document.body.classList.add('modal-open');

  seal.addEventListener('click', () => {
    cerrarModal();

    // Llama a la función global definida en audio.js
    if (typeof window.reproducirMusica === 'function') {
      window.reproducirMusica();
    }
  });

  function cerrarModal() {
    // Forzar scroll al inicio al cerrar modal
    window.scrollTo({ top: 0, behavior: 'auto' });

    modal.classList.add('fade-out');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }, 1000);
  }
});
