document.addEventListener('DOMContentLoaded', function () {
    // Función para guardar un pedido en localStorage
    function guardarPedido(pedido) {
        let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
        pedidos.push(pedido);
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
    }

    // Función para mostrar los detalles del pedido
    function mostrarDetallesPedido(pedido) {
        const tabla = document.getElementById('tabla-detalle');
        tabla.innerHTML = `
            <tr>
                <th>Número de Pedido</th>
                <td>${pedido.numeroPedido}</td>
            </tr>
            <tr>
                <th>Cliente</th>
                <td>${pedido.cliente}</td>
            </tr>
            <tr>
                <th>Fecha de Pedido</th>
                <td>${pedido.fechaPedido}</td>
            </tr>
            <tr>
                <th>Procesado</th>
                <td>${pedido.procesado ? 'Sí' : 'No'}</td>
            </tr>
            <tr>
                <th>Servido</th>
                <td>${pedido.servido ? 'Sí' : 'No'}</td>
            </tr>
        `;
    }

    // Gestión del formulario de "index.html" para guardar el pedido
    if (document.getElementById('form-pedido')) {
        document.getElementById('form-pedido').addEventListener('submit', function(event) {
            event.preventDefault();

            // Obtener los valores del formulario
            const numeroPedido = document.getElementById('numero-pedido').value;
            const cliente = document.getElementById('cliente').value;
            const fechaPedido = document.getElementById('fecha-pedido').value;
            const procesado = document.getElementById('procesado').checked;
            const servido = document.getElementById('servido').checked;

            // Validar que el número de pedido sea único
            let pedidosExistentes = JSON.parse(localStorage.getItem('pedidos')) || [];
            if (pedidosExistentes.some(p => p.numeroPedido === numeroPedido)) {
                alert('Este número de pedido ya existe. Elija otro.');
                return;
            }

            // Crear un objeto con los datos del pedido
            const pedido = {
                numeroPedido,
                cliente,
                fechaPedido,
                procesado,
                servido
            };

            // Guardar el pedido en localStorage
            guardarPedido(pedido);

            alert('Pedido guardado correctamente');

            // Limpiar el formulario
            document.getElementById('form-pedido').reset();
        });
    }

    // Gestión del formulario de "detalle.html" para mostrar los detalles del pedido
    if (document.getElementById('form-detalle')) {
        document.getElementById('form-detalle').addEventListener('submit', function(event) {
            event.preventDefault();

            let pedidoId = document.getElementById('numero-pedido-detalle').value;
            let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
            let pedidoEncontrado = pedidos.find(pedido => pedido.numeroPedido === pedidoId);

            if (pedidoEncontrado) {
                // Mostrar los detalles del pedido
                mostrarDetallesPedido(pedidoEncontrado);
            } else {
                document.getElementById('tabla-detalle').innerHTML = `
                    <tr>
                        <td colspan="2">No se encontró el pedido con ese número.</td>
                    </tr>
                `;
            }
        });
    }
});
