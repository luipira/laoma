// cart.js

document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');

    // Obtener el carrito desde localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Función para renderizar el carrito
    function renderCart() {
        cartContainer.innerHTML = ''; // Limpiar contenido previo

        if (cart.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.classList.add('empty-cart');
            emptyMessage.textContent = 'El carrito está vacío.';
            cartContainer.appendChild(emptyMessage);
            return;
        }

        // Crear tabla de carrito
        const table = document.createElement('table');
        table.classList.add('cart-table');

        // Crear encabezados de la tabla
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = ['Imagen', 'Producto', 'Precio', 'Cantidad', 'Subtotal', 'Acciones'];
        headers.forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Crear cuerpo de la tabla
        const tbody = document.createElement('tbody');

        let total = 0;

        cart.forEach(item => {
            const row = document.createElement('tr');

            // Imagen
            const imgCell = document.createElement('td');
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            imgCell.appendChild(img);
            row.appendChild(imgCell);

            // Nombre del producto
            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;
            row.appendChild(nameCell);

            // Precio
            const priceCell = document.createElement('td');
            priceCell.textContent = `$${item.price.toFixed(2)}`;
            row.appendChild(priceCell);

            // Cantidad
            const quantityCell = document.createElement('td');
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.min = 1;
            quantityInput.value = item.quantity;
            quantityInput.addEventListener('change', (e) => {
                const newQuantity = parseInt(e.target.value);
                if (newQuantity <= 0) {
                    e.target.value = 1;
                    return;
                }
                updateQuantity(item.id, newQuantity);
            });
            quantityCell.appendChild(quantityInput);
            row.appendChild(quantityCell);

            // Subtotal
            const subtotalCell = document.createElement('td');
            const subtotal = item.price * item.quantity;
            subtotalCell.textContent = `$${subtotal.toFixed(2)}`;
            row.appendChild(subtotalCell);

            // Acciones
            const actionsCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => {
                removeFromCart(item.id);
            });
            actionsCell.appendChild(deleteButton);
            row.appendChild(actionsCell);

            tbody.appendChild(row);

            total += subtotal;
        });

        table.appendChild(tbody);
        cartContainer.appendChild(table);

        // Mostrar total y botones de acción
        const cartActions = document.createElement('div');
        cartActions.classList.add('cart-actions');

        const totalText = document.createElement('span');
        totalText.textContent = `Total: $${total.toFixed(2)}`;
        cartActions.appendChild(totalText);

        const purchaseButton = document.createElement('button');
        purchaseButton.textContent = 'Confirmar Compra';
        purchaseButton.addEventListener('click', confirmPurchase);
        cartActions.appendChild(purchaseButton);

        const clearCartButton = document.createElement('button');
        clearCartButton.textContent = 'Vaciar Carrito';
        clearCartButton.addEventListener('click', clearCart);
        cartActions.appendChild(clearCartButton);

        cartContainer.appendChild(cartActions);
    }

    // Actualizar cantidad de un producto
    function updateQuantity(productId, newQuantity) {
        const product = cart.find(item => item.id === productId);
        if (product) {
            product.quantity = newQuantity;
            saveCart();
            renderCart();
        }
    }

    // Eliminar producto del carrito
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        renderCart();
    }

    // Confirmar compra
    function confirmPurchase() {
        if (cart.length === 0) {
            alert('El carrito está vacío.');
            return;
        }

        // Aquí podrías implementar la lógica para enviar los datos al servidor
        // Por ejemplo, usando fetch() para hacer una petición POST con los datos del carrito

        alert('¡Compra confirmada! Gracias por tu compra.');

        // Vaciar el carrito después de la compra
        cart = [];
        saveCart();
        renderCart();
    }

    // Vaciar carrito
    function clearCart() {
        if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
            cart = [];
            saveCart();
            renderCart();
        }
    }

    // Guardar carrito en localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Inicializar la vista del carrito
    renderCart();
});
