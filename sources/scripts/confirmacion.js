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

  // Confirmar asistencia con mensaje personalizado
  confirmBtn.addEventListener('click', () => {
    const modalContent = modal.querySelector('.module');
    modalContent.innerHTML = `
      <h3 class="second-head-title">Para confirmar tu asistencia, enviale un WhatsApp a:</h3>
      <div class="confirmacion-wa">
      <div class="contacto-wa">
      <img src="/sources/pictures/mama.jpeg" alt="Mama" id="mama">
      <p>Mami</p>
      </div>
      <div class="contacto-wa">
      <img src="/sources/pictures/papa.jpeg" alt="Mama" id="papa">
      <p>Papi</p>
      </div>
      </div>
    `;

    

    // ✅ Ahora sí: obtener los elementos recién insertados
  const sendmama = document.getElementById('mama');
  const sendpapa = document.getElementById('papa');

  sendmama.addEventListener('click', () => {
    modal.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.open('https://wa.me/5215613683435?text=Confirmo%20mi%20asistencia', '_blank');
  });

  sendpapa.addEventListener('click', () => {
    modal.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.open('https://wa.me/5215611347845?text=Confirmo%20mi%20asistencia', '_blank');
  });

  });
});
