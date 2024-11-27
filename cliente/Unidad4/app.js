// Registrar un nuevo pedido
document.getElementById('pedidoForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Crear el objeto pedido a partir de los datos del formulario
  const pedido = {
    id: parseInt(document.getElementById('id').value),
    cliente: document.getElementById('cliente').value,
    fecha: document.getElementById('fecha').value,
  };

  // Guardar en LocalStorage
  localStorage.setItem(`pedido_${pedido.id}`, JSON.stringify(pedido));

  alert('Pedido guardado exitosamente.');
  this.reset(); // Limpiar el formulario
});

// Buscar un pedido por ID
document.getElementById('buscarBtn').addEventListener('click', function () {
  const buscarId = parseInt(document.getElementById('buscarId').value);
  const pedidoGuardado = localStorage.getItem(`pedido_${buscarId}`);

  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = ''; // Limpiar resultados anteriores

  if (pedidoGuardado) {
    const pedido = JSON.parse(pedidoGuardado);

    // Mostrar el pedido en HTML
    resultadoDiv.innerHTML = `
      <p><strong>ID:</strong> ${pedido.id}</p>
      <p><strong>Cliente:</strong> ${pedido.cliente}</p>
      <p><strong>Fecha:</strong> ${pedido.fecha}</p>
    `;
  } else {
    resultadoDiv.innerHTML = '<p>No se encontró ningún pedido con ese ID.</p>';
  }
});
