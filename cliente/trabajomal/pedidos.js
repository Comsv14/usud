const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

function mostrarPaginaPedidos() {
  const contenido = document.getElementById('contenido');
  contenido.innerHTML = `
    <h2>Gestión de Pedidos</h2>
    <form id="formPedido">
      <label for="numero">Número de Pedido:</label>
      <input type="number" id="numero" min="1" required>
      <label for="cliente">Cliente:</label>
      <input type="text" id="cliente" maxlength="50" required>
      <label for="fecha">Fecha:</label>
      <input type="date" id="fecha" required>
      <button type="submit">Añadir Pedido</button>
    </form>
    <table>
      <thead>
        <tr>
          <th>Número</th>
          <th>Cliente</th>
          <th>Fecha</th>
          <th>Procesado</th>
          <th>Servido</th>
        </tr>
      </thead>
      <tbody id="tablaPedidos"></tbody>
    </table>
  `;
  document.getElementById('formPedido').addEventListener('submit', añadirPedido);
  cargarPedidos();
}

function añadirPedido(e) {
  e.preventDefault();
  const numero = parseInt(document.getElementById('numero').value, 10);
  const cliente = document.getElementById('cliente').value;
  const fecha = document.getElementById('fecha').value;

  if (pedidos.some(p => p.numero === numero)) {
    alert('El número de pedido ya existe.');
    return;
  }

  if (new Date(fecha) > new Date()) {
    alert('La fecha no puede ser futura.');
    return;
  }

  pedidos.push({ numero, cliente, fecha, procesado: false, servido: false });
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
  cargarPedidos();
}

function cargarPedidos() {
  const tabla = document.getElementById('tablaPedidos');
  tabla.innerHTML = pedidos.map(p => `
    <tr>
      <td>${p.numero}</td>
      <td>${p.cliente}</td>
      <td>${p.fecha}</td>
      <td>${p.procesado}</td>
      <td>${p.servido}</td>
    </tr>
  `).join('');
}
