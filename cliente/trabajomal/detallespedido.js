function mostrarPaginaDetalles() {
    const contenido = document.getElementById('contenido');
    contenido.innerHTML = `
      <h2>Detalle de Pedido</h2>
      <form id="formDetalle">
        <label for="numeroPedidoDetalle">Número de Pedido:</label>
        <input type="number" id="numeroPedidoDetalle" min="1" required>
        <button type="submit">Consultar Detalles</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Número de Pieza</th>
            <th>Largo (cm)</th>
            <th>Ancho (cm)</th>
            <th>Grosor (cm)</th>
            <th>Color</th>
            <th>Superficie (cm²)</th>
            <th>Volumen (cm³)</th>
          </tr>
        </thead>
        <tbody id="tablaDetalles"></tbody>
      </table>
    `;
    document.getElementById('formDetalle').addEventListener('submit', consultarDetallesPedido);
  }
  
  function consultarDetallesPedido(e) {
    e.preventDefault();
    const numeroPedidoDetalle = parseInt(document.getElementById('numeroPedidoDetalle').value, 10);
  
    const pedidoExiste = pedidos.some(p => p.numero === numeroPedidoDetalle);
    if (!pedidoExiste) {
      alert('El número de pedido no existe.');
      return;
    }
  
    const piezasPedido = piezas.filter(p => p.pedidoAsociado === numeroPedidoDetalle);
    const tabla = document.getElementById('tablaDetalles');
  
    if (piezasPedido.length === 0) {
      tabla.innerHTML = '<tr><td colspan="7">No hay piezas asociadas a este pedido.</td></tr>';
      return;
    }
  
    tabla.innerHTML = piezasPedido.map(p => {
      const superficie = p.largo * p.ancho;
      const volumen = p.largo * p.ancho * p.grosor;
      return `
        <tr>
          <td>${p.numeroPieza}</td>
          <td>${p.largo}</td>
          <td>${p.ancho}</td>
          <td>${p.grosor}</td>
          <td>${p.color}</td>
          <td>${superficie.toFixed(2)}</td>
          <td>${volumen.toFixed(2)}</td>
        </tr>
      `;
    }).join('');
  }
  