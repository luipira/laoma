let index = 0;

function showSlide(n) {
    const slides = document.querySelectorAll('.carimages img');
    if (n >= slides.length) index = 0;
    if (n < 0) index = slides.length - 1;
    
    const offset = -index * 100;
    document.querySelector('.carimages').style.transform = `translateX(${offset}%)`;
}

function moveSlide(step) {
    index += step;
    showSlide(index);
}

// Inicializa el carrusel
showSlide(index);

// Opcional: Cambiar automáticamente de imagen cada 3 segundos
setInterval(() => {
    moveSlide(1);
}, 3000);
