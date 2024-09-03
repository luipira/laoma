document.addEventListener('DOMContentLoaded', () => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const purchaseButton = document.createElement('button');

    purchaseButton.textContent = 'Confirmar Compra';
    purchaseButton.id = 'purchase-button';
    document.body.appendChild(purchaseButton);

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            addToCart(name, price);
        });
    });

    purchaseButton.addEventListener('click', () => {
        alert('Compra confirmada! Enviando datos al servidor...');
        // Aquí iría la lógica para enviar los datos al servidor.
        console.log('Datos enviados:', cartItems);

        cartItems = []; // Vaciar el carrito después de la compra
        updateCart();
        localStorage.removeItem('cartItems'); // Limpiar el carrito de localStorage
    });

    function addToCart(name, price) {
        const existingItem = cartItems.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ name, price, quantity: 1 });
        }
        updateCart();
    }

    function removeFromCart(name) {
        cartItems = cartItems.filter(item => item.name !== name);
        updateCart();
    }

    function updateCart() {
        cartItemsList.innerHTML = '';
        let total = 0;

        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;

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
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    updateCart(); // Actualizar la vista del carrito cuando la página se carga
});
