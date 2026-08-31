// ==========================================
// 1. INICIALIZACIÓN Y MÚSICA DE FONDO
// ==========================================
const btnStart = document.getElementById('btn-start');
const musica = document.getElementById('musicaFondo');

btnStart.addEventListener('click', () => {
  // 1. Ocultar pantalla de bienvenida y mostrar el contenido principal
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('main-content').classList.remove('hidden');

  // 2. Iniciar música desde el segundo 8
  if (musica) {
    musica.currentTime = 8;
    musica.play().catch(error => {
      console.log("Error al reproducir el audio:", error);
    });
  }
});

// ==========================================
// 2. LÓGICA DEL CARRUSEL INFINITO Y FLUIDO
// ==========================================
const track = document.getElementById('track');
const slides = Array.from(track.children);
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
let currentIndex = 0;

function moveToSlide(index) {
  track.style.transition = 'transform 0.4s ease-in-out';
  track.style.transform = `translateX(-${index * 100}%)`;
}

// Botón Siguiente
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (currentIndex >= slides.length - 1) return;
    currentIndex++;
    moveToSlide(currentIndex);
  });
}

// Botón Anterior
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    if (currentIndex <= 0) {
      track.style.transition = 'none';
      currentIndex = slides.length - 1;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      setTimeout(() => {
        currentIndex--;
        moveToSlide(currentIndex);
      }, 20);
    } else {
      currentIndex--;
      moveToSlide(currentIndex);
    }
  });
}

// Reset invisible cuando llega al clon
if (track) {
  track.addEventListener('transitionend', () => {
    if (slides[currentIndex] && slides[currentIndex].id === 'first-clone') {
      track.style.transition = 'none';
      currentIndex = 0;
      track.style.transform = `translateX(0%)`;
    }
  });
}

// ==========================================
// 3. APERTURA DE CARTA
// ==========================================
const btnOpenEnvelope = document.getElementById('btn-open-envelope');
if (btnOpenEnvelope) {
  btnOpenEnvelope.addEventListener('click', function() {
    this.classList.add('hidden');
    document.getElementById('letter').classList.remove('hidden');
  });
}

// ==========================================
// 4. EFECTO DE CONFETI Y CORAZONES
// ==========================================
const btnCelebrate = document.getElementById('btn-celebrate');
if (btnCelebrate) {
  btnCelebrate.addEventListener('click', () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
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
}

// ==========================================
// 5. APARICIÓN DE LA FOTO FINAL AL HACER SCROLL
// ==========================================
const fotoFinal = document.querySelector('.final-photo');

const cargarFoto = (entradas, observador) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('aparecer');
      observador.unobserve(entrada.target);
    }
  });
};

const observador = new IntersectionObserver(cargarFoto, {
  root: null,
  rootMargin: '0px 0px -50px 0px',
  threshold: 0.5
});

if (fotoFinal) {
  observador.observe(fotoFinal);
}
