const piezas = JSON.parse(localStorage.getItem('piezas')) || [];

function mostrarPaginaPiezas() {
  const contenido = document.getElementById('contenido');
  contenido.innerHTML = `
    <h2>Gestión de Piezas</h2>
    <form id="formPieza">
      <label for="numeroPieza">Número de Pieza:</label>
      <input type="number" id="numeroPieza" min="1" required>
      <label for="pedidoAsociado">Número de Pedido:</label>
      <input type="number" id="pedidoAsociado" min="1" required>
      <label for="largo">Largo (cm):</label>
      <input type="number" id="largo" min="1" required>
      <label for="ancho">Ancho (cm):</label>
      <input type="number" id="ancho" min="1" required>
      <label for="grosor">Grosor (cm):</label>
      <input type="number" id="grosor" min="1" required>
      <label for="color">Color:</label>
      <input type="text" id="color" required>
      <label for="ambasCaras">Ambas Caras:</label>
      <input type="checkbox" id="ambasCaras">
      <button type="submit">Añadir Pieza</button>
    </form>
    <table>
      <thead>
        <tr>
          <th>Número</th>
          <th>Pedido</th>
          <th>Largo</th>
          <th>Ancho</th>
          <th>Grosor</th>
          <th>Color</th>
          <th>Cortada</th>
        </tr>
      </thead>
      <tbody id="tablaPiezas"></tbody>
    </table>
  `;
  document.getElementById('formPieza').addEventListener('submit', añadirPieza);
  cargarPiezas();
}

function añadirPieza(e) {
  e.preventDefault();
  const numeroPieza = parseInt(document.getElementById('numeroPieza').value, 10);
  const pedidoAsociado = parseInt(document.getElementById('pedidoAsociado').value, 10);
  const largo = parseFloat(document.getElementById('largo').value);
  const ancho = parseFloat(document.getElementById('ancho').value);
  const grosor = parseFloat(document.getElementById('grosor').value);
  const color = document.getElementById('color').value;
  const ambasCaras = document.getElementById('ambasCaras').checked;

  if (!pedidos.some(p => p.numero === pedidoAsociado)) {
    alert('El pedido asociado no existe.');
    return;
  }

  piezas.push({ numeroPieza, pedidoAsociado, largo, ancho, grosor, color, ambasCaras, cortada: false });
  localStorage.setItem('piezas', JSON.stringify(piezas));
  cargarPiezas();
}

function cargarPiezas() {
  const tabla = document.getElementById('tablaPiezas');
  tabla.innerHTML = piezas.map(p => `
    <tr>
      <td>${p.numeroPieza}</td>
      <td>${p.pedidoAsociado}</td>
      <td>${p.largo}</td>
      <td>${p.ancho}</td>
      <td>${p.grosor}</td>
      <td>${p.color}</td>
      <td>${p.cortada}</td>
    </tr>
  `).join('');
}
