// Guardar un pedido
function guardarPedido(event) {
    event.preventDefault();
  
    let id = document.getElementById('id').value;
    let cliente = document.getElementById('cliente').value;
    let fecha = document.getElementById('fecha').value;
  
    let pedido = {
      id: parseInt(id),
      cliente: cliente,
      fecha: fecha,
      piezas: [] // Array para almacenar las piezas del pedido
    };
  
    localStorage.setItem('pedido_' + pedido.id, JSON.stringify(pedido));
    alert('Pedido guardado exitosamente');
    document.getElementById('pedidoForm').reset();
  }
  
  // Añadir una pieza a un pedido
  function agregarPieza(event) {
    event.preventDefault();
  
    let pedidoId = document.getElementById('pedidoId').value;
    let pedidoGuardado = localStorage.getItem('pedido_' + pedidoId);
  
    if (pedidoGuardado) {
      let pedido = JSON.parse(pedidoGuardado);
  
      let numPieza = document.getElementById('numPieza').value;
      let largo = parseFloat(document.getElementById('largo').value);
      let ancho = parseFloat(document.getElementById('ancho').value);
      let grosor = parseFloat(document.getElementById('grosor').value);
      let color = document.getElementById('color').value;
  
      let superficie = largo * ancho;
      let volumen = largo * ancho * grosor;
  
      let pieza = {
        numPieza: parseInt(numPieza),
        largo: largo,
        ancho: ancho,
        grosor: grosor,
        color: color,
        superficie: superficie.toFixed(2),
        volumen: volumen.toFixed(2)
      };
  
      pedido.piezas.push(pieza);
  
      localStorage.setItem('pedido_' + pedido.id, JSON.stringify(pedido));
      alert('Pieza añadida exitosamente');
      document.getElementById('piezaForm').reset();
    } else {
      alert('No existe un pedido con ese ID.');
    }
  }
  
  // Mostrar un pedido con sus piezas
  function mostrarPedido() {
    let buscarId = document.getElementById('buscarId').value;
    let resultadoDiv = document.getElementById('resultado');
  
    let pedidoGuardado = localStorage.getItem('pedido_' + buscarId);
  
    resultadoDiv.innerHTML = '';
  
    if (pedidoGuardado) {
      let pedido = JSON.parse(pedidoGuardado);
  
      // Mostrar datos del pedido
      resultadoDiv.innerHTML = `
        <p><strong>ID:</strong> ${pedido.id}</p>
        <p><strong>Cliente:</strong> ${pedido.cliente}</p>
        <p><strong>Fecha:</strong> ${pedido.fecha}</p>
        <h4>Piezas:</h4>
      `;
  
      // Crear tabla de piezas
      let tabla = document.createElement('table');
      tabla.border = "1";
      let thead = tabla.createTHead();
      thead.innerHTML = `
        <tr>
          <th>Num. Pieza</th>
          <th>Largo</th>
          <th>Ancho</th>
          <th>Grosor</th>
          <th>Color</th>
          <th>Superficie</th>
          <th>Volumen</th>
        </tr>
      `;
  
      let tbody = tabla.createTBody();
      pedido.piezas.forEach(pieza => {
        let fila = tbody.insertRow();
        fila.innerHTML = `
          <td>${pieza.numPieza}</td>
          <td>${pieza.largo}</td>
          <td>${pieza.ancho}</td>
          <td>${pieza.grosor}</td>
          <td>${pieza.color}</td>
          <td>${pieza.superficie}</td>
          <td>${pieza.volumen}</td>
        `;
      });
  
      resultadoDiv.appendChild(tabla);
    } else {
      resultadoDiv.innerHTML = '<p>No se encontró ningún pedido con ese ID.</p>';
    }
  }
  