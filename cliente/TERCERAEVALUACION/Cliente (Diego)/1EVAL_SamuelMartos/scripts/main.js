function comprobar() {
    // Instancia de la clase Pedidos
    const pedidos = new Pedidos();

    // Selecciona el botón y el campo de texto
    const boton = document.getElementById('comprobar');
    const input = document.querySelector('input');

    boton.addEventListener('click', () => {
        const numeroPedido = input.value.trim();

        if (numeroPedido === "") {
            alert("Por favor, introduce un número de pedido.");
            return;
        }

        const pedido = pedidos.existePedido(numeroPedido);
        if (pedido) {
            // Redirige a pedidos.html con el ID del pedido como parámetro en la URL
            window.location.href = `pedidos.html?pedido=${pedido.id}`;
        } else {
            alert("Número de pedido no encontrado.");
        }
    });
}