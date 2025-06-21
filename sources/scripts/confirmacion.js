document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('confirm-modal');
  const closeBtn = modal.querySelector('.close-btn');
  const contentWrapper = modal.querySelector('.modal-content');

  // 💾 Guarda el contenido original para restaurarlo después
  const originalContent = contentWrapper.innerHTML;

  // 👉 Evento para mostrar el modal al llegar al final del scroll
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
      // Restaurar el contenido original cada vez que se muestra
      contentWrapper.innerHTML = originalContent;

      // Volver a aplicar la animación
      contentWrapper.classList.remove('fade-in');
      void contentWrapper.offsetWidth;
      contentWrapper.classList.add('fade-in');

      modal.classList.remove('hidden');

      // Volver a conectar el botón "Asistiré"
      const confirmBtn = document.getElementById('confirm-btn');
      confirmBtn.addEventListener('click', () => {
        contentWrapper.classList.remove('fade-in');
        void contentWrapper.offsetWidth;
        contentWrapper.classList.add('fade-in');

        contentWrapper.innerHTML = `
          <h3 class="second-head-title fade-in">Para confirmar tu asistencia, envíale un WhatsApp a:</h3>
          <div class="confirmacion-wa fade-in">
            <div class="contacto-wa">
              <img src="sources/pictures/mama.jpeg" alt="Mama" id="mama">
              <p>Mami</p>
            </div>
            <div class="contacto-wa">
              <img src="sources/pictures/papa.jpeg" alt="Papa" id="papa">
              <p>Papi</p>
            </div>
          </div>
        `;

        // Conectar eventos a los nuevos botones
        document.getElementById('mama').addEventListener('click', () => {
          modal.classList.add('hidden');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.open('https://wa.me/5215613683435?text=Confirmo%20mi%20asistencia', '_blank');
        });

        document.getElementById('papa').addEventListener('click', () => {
          modal.classList.add('hidden');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.open('https://wa.me/5215611347845?text=Confirmo%20mi%20asistencia', '_blank');
        });
      });
    }
  });

  // 👉 Evento para cerrar al hacer clic fuera del modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  // 👉 Evento para cerrar con el botón "X"
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
});
