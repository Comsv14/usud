//función para guardar un pedido en LocalStorage
function guardarPedido(event) {
  //evita el comportamiento por defecto de recargar la página
  event.preventDefault();  

  let id = document.getElementById('id').value;
  let cliente = document.getElementById('cliente').value;
  let fecha = document.getElementById('fecha').value;

  let pedido = {
    id: parseInt(id),
    cliente: cliente,
    fecha: fecha
  };
  //guardar en localstorage con la clave 'pedido_ID'
  //convierte el objeto pedido en una cadena json que se veria asi'{"id":123,"cliente":"Juan Pérez","fecha":"2024-11-27"}' porque el localstorage solo guarda cadenas
  localStorage.setItem('pedido_' + pedido.id, JSON.stringify(pedido)); 

  alert('Pedido guardado exitosamente');
  document.getElementById('pedidoForm').reset();  // Limpiar el formulario
}
//funcion para buscar un pedido en LocalStorage por su ID
function buscarPedido() {
  let buscarId = document.getElementById('buscarId').value;
  let resultadoDiv = document.getElementById('resultado');

  let pedidoGuardado = localStorage.getItem('pedido_' + buscarId);

  //limpiar resultados previos en el div con el id resultado
  resultadoDiv.innerHTML = '';

  if (pedidoGuardado) {
    //vuelvea convertir la cadena json en un objeto let pedido={id:2, cliente: "paco", fecha: "2024-11-27"}
    let pedido = JSON.parse(pedidoGuardado); 
    resultadoDiv.innerHTML = '<p><strong>ID:</strong> ' + pedido.id + '</p>' +
                             '<p><strong>Cliente:</strong> ' + pedido.cliente + '</p>' +
                             '<p><strong>Fecha:</strong> ' + pedido.fecha + '</p>';
  } else {
    resultadoDiv.innerHTML = '<p>No se encontró ningún pedido con ese ID.</p>';
  }
}
