document.addEventListener('DOMContentLoaded', () => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    function updateCart() {
        cartItemsList.innerHTML = '';
        let total = 0;

        cartItems.forEach(item => {
            const li = document.createElement('li');
            
            const img = document.createElement('img');
            img.src = item.imageUrl;
            img.alt = item.name;
            img.width = 50;

            li.appendChild(img);
            li.appendChild(document.createTextNode(`${item.name} - $${item.price} x ${item.quantity}`));

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.addEventListener('click', () => {
                removeFromCart(item.name);
            });

            li.appendChild(removeButton);
            cartItemsList.appendChild(li);

            total += item.price * item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);
    }

    function removeFromCart(name) {
        cartItems = cartItems.filter(item => item.name !== name);
        updateCart();
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Actualizar localStorage
    }

    document.getElementById('purchase-button').addEventListener('click', () => {
        alert('Compra confirmada! Enviando datos al servidor...');
        // Aquí iría la lógica para enviar los datos al servidor.
        console.log('Datos enviados:', cartItems);

        cartItems = []; // Vaciar el carrito después de la compra
        updateCart();
        localStorage.removeItem('cartItems'); // Limpiar el carrito de localStorage
    });

    updateCart(); // Actualizar la vista del carrito cuando la página se carga
});
