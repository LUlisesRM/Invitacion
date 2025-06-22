document.addEventListener('DOMContentLoaded', () => {
    // Animación de Lottie para el sello
    setTimeout(() => {
        const guide = document.getElementById('guide-overlay');
        const seal = document.getElementById('seal');
        const lottieGuide = document.getElementById('lottie-guide');

        if (guide && seal && lottieGuide) {
            guide.classList.add('visible');

            const sealRect = seal.getBoundingClientRect();
            lottieGuide.style.top = `${sealRect.top + window.scrollY - 10}px`;
            lottieGuide.style.left = `${sealRect.left + window.scrollX + (sealRect.width / 2) - 126}px`;

            lottie.loadAnimation({
                container: lottieGuide,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'sources/animations/click-hand.json'
            });

            setTimeout(() => {
                lottieGuide.style.animation = 'fadeLoop 3s ease-in-out infinite';
            }, 2000);

            guide.addEventListener('click', () => {
                guide.classList.remove('visible');
            });
        }
    }, 2000);

    // Animación de Lottie para swipe up
    const header = document.querySelector('.header');

    if (!header) {
        console.warn("No se encontró el header para observar.");
        return;
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (
                mutation.type === 'attributes' &&
                mutation.attributeName === 'class' &&
                !header.classList.contains('header-hidden')
            ) {
                observer.disconnect();

                setTimeout(() => {
                    const guide = document.getElementById('swipe-guide-overlay');
                    const lottieGuide = document.getElementById('swipe-lottie-guide');

                    if (guide && lottieGuide) {
                        guide.classList.add('visible');

                        const headerRect = header.getBoundingClientRect();
                        lottieGuide.style.top = `${headerRect.top + window.scrollY + 100}px`;
                        lottieGuide.style.left = `${headerRect.left + window.scrollX + (headerRect.width / 2) - 125}px`;
                        console.log("Cargando animación swipe");

                        lottie.destroy();

                        lottie.loadAnimation({
                            container: lottieGuide,
                            renderer: 'svg',
                            loop: true,
                            autoplay: true,
                            path: 'sources/animations/swipe-up.json'
                        });

                        setTimeout(() => {
                            lottieGuide.style.animation = 'fadeLoop 3s ease-in-out infinite';
                        }, 2000);

                        guide.addEventListener('click', () => {
                            guide.classList.remove('visible');
                        });
                    }
                }, 1000);
            }
        });
    });

    observer.observe(header, {
        attributes: true,
        attributeFilter: ['class']
    });
});
