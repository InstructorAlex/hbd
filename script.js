// Mostrar contenido principal
document.getElementById('btn-start').addEventListener('click', () => {
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('main-content').classList.remove('hidden');
});

// Lógica del carrusel
const track = document.getElementById('track');
const slides = Array.from(track.children);
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
let currentIndex = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

// Lógica para abrir el sobre
document.getElementById('btn-open-envelope').addEventListener('click', function() {
  this.classList.add('hidden');
  document.getElementById('letter').classList.remove('hidden');
});

// Lógica de fuegos artificiales/confeti con corazones
document.getElementById('btn-celebrate').addEventListener('click', () => {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    // Confeti estándar
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#3a86ff', '#8338ec', '#c8b6ff']
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#3a86ff', '#8338ec', '#c8b6ff']
    });

    // Corazones flotantes
    confetti({
      particleCount: 2,
      spread: 100,
      origin: { y: 0.6 },
      shapes: ['heart'],
      colors: ['#ff4d6d', '#8338ec', '#3a86ff']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
});