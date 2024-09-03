document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const imageUrl = button.getAttribute('data-image');

            addToCart(name, price, imageUrl);
        });
    });

    function addToCart(name, price, imageUrl) {
        const existingItem = cartItems.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ name, price, quantity: 1, imageUrl });
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Guardar el carrito en localStorage
        alert('Producto agregado al carrito');
    }
});
