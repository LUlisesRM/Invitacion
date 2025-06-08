document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    // Convertimos a Array para usar métodos como map, filter, etc.
    const slides = Array.from(document.querySelectorAll('.carousel-img')); 
    
    // El número de imágenes originales (sin los clones que agregamos al principio y al final)
    const originalSlideCount = slides.length - 2; 

    let slideWidth; // Se calculará al inicio
    // Comenzamos en el índice 1 para mostrar la primera imagen original (después del clon inicial)
    let index = 1; 
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let isDragging = false;
    let autoSlideInterval;

    function getSlideWidth() {
     
        return slides[0].offsetWidth + (parseFloat(getComputedStyle(track).gap) || 0);
    }

    function setPosition(animate = true) {
        track.style.transition = animate ? 'transform 0.4s ease' : 'none';
        track.style.transform = `translateX(${-index * slideWidth}px)`;
        prevTranslate = -index * slideWidth; // Actualiza el translate para el arrastre
    }

    // Avanza al siguiente slide
    function goToNextSlide() {
        index++;
        setPosition(true);
    }

    // Regresa al slide anterior
    function goToPrevSlide() {
        index--;
        setPosition(true);
    }

    // Inicia el avance automático del carrusel
    function startAutoSlide() {
        // Limpiar cualquier intervalo anterior para evitar múltiples ejecuciones
        clearInterval(autoSlideInterval); 
        autoSlideInterval = setInterval(() => {
            if (!isDragging) { // Solo avanza si el usuario no está arrastrando
                goToNextSlide();
            }
        }, 3000); // Avanza cada 3 segundos
    }

    // --- Lógica del Loop Infinito (Usando Clones) ---
    track.addEventListener('transitionend', () => {
        // Si el índice llega al clon de la primera imagen (originalSlideCount + 1),
        // saltamos instantáneamente a la primera imagen real (índice 1).
        if (index === originalSlideCount + 1) {
            track.style.transition = 'none'; // Deshabilita la transición para el salto
            index = 1; // Volvemos a la primera imagen original
            track.style.transform = `translateX(${-index * slideWidth}px)`;
            prevTranslate = -index * slideWidth; // Actualizar el translate
        } 
        // Si el índice llega al clon de la última imagen (índice 0),
        // saltamos instantáneamente a la última imagen real (originalSlideCount).
        else if (index === 0) {
            track.style.transition = 'none'; // Deshabilita la transición para el salto
            index = originalSlideCount; // Volvemos a la última imagen original
            track.style.transform = `translateX(${-index * slideWidth}px)`;
            prevTranslate = -index * slideWidth; // Actualizar el translate
        }
    });

    // --- Eventos de Arrastre (Mouse y Touch) ---

    // Manejador de inicio de arrastre
    function handleStart(clientX) {
        isDragging = true;
        startPos = clientX;
        track.style.transition = 'none'; // Deshabilita la transición mientras arrastras
        currentTranslate = prevTranslate; // Establece la posición actual para el arrastre
    }

    // Manejador de movimiento de arrastre
    function handleMove(clientX) {
        if (!isDragging) return;
        const deltaX = clientX - startPos; // Cuánto se ha movido el cursor/dedo
        // Mueve el track según el arrastre desde la posición actual
        track.style.transform = `translateX(${currentTranslate + deltaX}px)`;
    }

    // Manejador de fin de arrastre
    function handleEnd(clientX) {
        if (!isDragging) return;
        isDragging = false;
        const movedBy = clientX - startPos; // Distancia total arrastrada

        // Determinar si se arrastró lo suficiente para cambiar de slide
        if (movedBy < -50) { // Si se arrastró hacia la izquierda (avanzar)
            goToNextSlide();
        } else if (movedBy > 50) { // Si se arrastró hacia la derecha (retroceder)
            goToPrevSlide();
        } else { // Si no se movió lo suficiente, volver a la posición original
            setPosition(true); 
        }
    }

    // Eventos de Mouse
    track.addEventListener('mousedown', e => {
        e.preventDefault(); // Previene el arrastre de imagen por defecto
        handleStart(e.clientX);
    });
    // Los eventos mousemove y mouseup deben ser en `window` para que el arrastre no se corte si el cursor sale del track
    window.addEventListener('mousemove', e => handleMove(e.clientX));
    window.addEventListener('mouseup', e => handleEnd(e.clientX));

    // Eventos Touch
    // `passive: true` para `touchstart` y `touchend` suele ser seguro,
    // pero `passive: false` en `touchmove` es crucial si usas `e.preventDefault()`
    track.addEventListener('touchstart', e => handleStart(e.touches[0].clientX), { passive: true });
    track.addEventListener('touchmove', e => {
        e.preventDefault(); // Previene el scroll vertical al arrastrar horizontalmente
        handleMove(e.touches[0].clientX);
    }, { passive: false });
    track.addEventListener('touchend', e => handleEnd(e.changedTouches[0].clientX));

    // --- Inicialización y Eventos de Ventana ---

    // Actualizar `slideWidth` y la posición si se cambia el tamaño de la pantalla
    window.addEventListener('resize', () => {
        slideWidth = getSlideWidth();
        setPosition(false); // Sin transición al redimensionar
    });

    // Inicializar al cargar la página
    slideWidth = getSlideWidth();
    setPosition(false); // Establecer la posición inicial sin transición

    // --- Pausa y Reanudación del Auto-slide ---

    // Pausar auto-slide al pasar el mouse por encima
    track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));

    // Reanudar auto-slide al quitar el mouse
    track.addEventListener('mouseleave', () => startAutoSlide());

    // Iniciar el auto-slide por primera vez
    startAutoSlide();
});