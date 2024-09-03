// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los botones de "Agregar al Carrito"
    const addToCartButtons = document.querySelectorAll('.product-item button');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
});

function addToCart(event) {
    const button = event.target;
    const productId = button.getAttribute('data-id');
    const productName = button.getAttribute('data-name');
    const productPrice = parseFloat(button.getAttribute('data-price'));
    const productImage = button.getAttribute('data-image');

    // Obtener el carrito actual desde localStorage o inicializar uno nuevo
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verificar si el producto ya existe en el carrito
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex !== -1) {
        // Si existe, aumentar la cantidad
        cart[existingProductIndex].quantity += 1;
    } else {
        // Si no existe, agregar nuevo producto
        const newProduct = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };
        cart.push(newProduct);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Notificar al usuario
    alert(`${productName} se ha agregado al carrito.`);
}
