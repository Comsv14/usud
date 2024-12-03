// Manejar el formulario de detalles del pedido
function agregarPieza(event) {
    event.preventDefault();
  
    // Obtener valores del formulario
    let numPieza = document.getElementById('numPieza').value;
    let largo = parseFloat(document.getElementById('largo').value);
    let ancho = parseFloat(document.getElementById('ancho').value);
    let grosor = parseFloat(document.getElementById('grosor').value);
    let color = document.getElementById('color').value;
  
    // Calcular superficie y volumen
    let superficie = largo * ancho;
    let volumen = largo * ancho * grosor;
  
    // Añadir fila a la tabla
    let tablaPiezas = document.getElementById('tablaPiezas');
    let nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
      <td>${numPieza}</td>
      <td>${largo}</td>
      <td>${ancho}</td>
      <td>${grosor}</td>
      <td>${color}</td>
      <td>${superficie.toFixed(2)}</td>
      <td>${volumen.toFixed(2)}</td>
    `;
    tablaPiezas.appendChild(nuevaFila);
  
    // Limpiar formulario
    document.getElementById('detalleForm').reset();
  }
  