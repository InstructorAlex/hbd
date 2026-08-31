// ==========================================
// 1. INICIALIZACIÓN Y MÚSICA DE FONDO
// ==========================================
const btnStart = document.getElementById('btn-start');
const musica = document.getElementById('musicaFondo');

btnStart.addEventListener('click', () => {
  // Ocultar pantalla inicial y mostrar contenido principal
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('main-content').classList.remove('hidden');

  // Reproducir canción desde el segundo 8
  musica.currentTime = 8;
  musica.play().catch(error => {
    console.log("Error al reproducir el audio:", error);
  });
});

// ==========================================
// 2. LÓGICA DEL CARRUSEL (SIN REBOBINADO)
// ==========================================
const track = document.getElementById('track');
const slides = Array.from(track.children);
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
let currentIndex = 0;

function updateCarousel(animated = true) {
  if (animated) {
    track.style.transition = 'transform 0.4s ease-in-out';
  } else {
    track.style.transition = 'none'; // Desactiva la animación para saltar sin rebobinado
  }
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener('click', () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateCarousel(true);
  } else {
    // Si llega al final, salta al inicio al instante sin animación
    currentIndex = 0;
    updateCarousel(false);
    void track.offsetWidth; // Fuerza al navegador a procesar el salto
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel(true);
  } else {
    // Si retrocede desde la primera, salta directo a la última sin animación
    currentIndex = slides.length - 1;
    updateCarousel(false);
    void track.offsetWidth;
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
nextBtn.addEventListener('click', () => {
  if (currentIndex >= slides.length - 1) return;
  currentIndex++;
  moveToSlide(currentIndex);
});

// Botón Anterior
prevBtn.addEventListener('click', () => {
  if (currentIndex <= 0) {
    // Si está en la primera foto y da atrás, salta al clon final sin animación y luego retrocede
    track.style.transition = 'none';
    currentIndex = slides.length - 1;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Forzar renderizado e ir a la última foto real (foto 29)
    setTimeout(() => {
      currentIndex--;
      moveToSlide(currentIndex);
    }, 20);
  } else {
    currentIndex--;
    moveToSlide(currentIndex);
  }
});

// Reset invisible cuando llega al clon
track.addEventListener('transitionend', () => {
  if (slides[currentIndex].id === 'first-clone') {
    track.style.transition = 'none'; // Quita la animación
    currentIndex = 0; // Vuelve a la primera foto real
    track.style.transform = `translateX(0%)`; // Reposiciona en 0s
  }
});

// ==========================================
// 3. APERTURA DE CARTA
// ==========================================
document.getElementById('btn-open-envelope').addEventListener('click', function() {
  this.classList.add('hidden');
  document.getElementById('letter').classList.remove('hidden');
});

// ==========================================
// 4. EFECTO DE CONFETI Y CORAZONES
// ==========================================
document.getElementById('btn-celebrate').addEventListener('click', () => {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    // Confeti lateral
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
