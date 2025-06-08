document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('confirm-modal');
  const confirmBtn = document.getElementById('confirm-btn');

  // Mostrar el modal cuando el usuario llega al final
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
      modal.classList.remove('hidden');
    }
  });

  // Cerrar al hacer clic fuera del contenido
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  // Confirmar asistencia
  confirmBtn.addEventListener('click', () => {
    modal.classList.add('hidden'); // Cierra modal
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Ir al inicio
    window.open('https://wa.me/5215613683435?text=Confirmo%20mi%20asistencia', '_blank');
  });
});
