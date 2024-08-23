document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.btn-agregar');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            const producto = boton.parentElement;
            const id = producto.getAttribute('data-id');
            const nombre = producto.querySelector('h3').textContent;
            const precio = producto.querySelector('p').textContent.split('$')[1];

            agregarAlCarrito(id, nombre, precio);
        });
    });
});

function agregarAlCarrito(id, nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${nombre} se ha agregado al carrito.`);
}
