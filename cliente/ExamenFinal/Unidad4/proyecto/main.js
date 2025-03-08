const pedidosKey = "pedidos";
const piezasKey = "piezas";

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

//dunción para cargar datos iniciales asegurando que los pedidos 1 y 2 siempre existan
function cargarDatosIniciales() {
  const pedidos = getLocalStorage(pedidosKey);
  const piezas = getLocalStorage(piezasKey);

  //define los pedidos "fijos"
  const pedidosFijos = [
    {
      numeroPedido: 1,
      cliente: "Juan Pérez",
      fechaPedido: "2024-11-20",
      procesado: false,
      servido: false,
      piezas: []
    },
    {
      numeroPedido: 2,
      cliente: "Ana López",
      fechaPedido: "2024-11-25",
      procesado: true,
      servido: false,
      piezas: []
    }
  ];

  //asegurarse de que los pedidos fijos estén siempre en LocalStorage
  for (let i = 0; i < pedidosFijos.length; i++) {
    const pedidoFijo = pedidosFijos[i];
    let existe = false;
    for (let j = 0; j < pedidos.length; j++) {
      if (pedidos[j].numeroPedido === pedidoFijo.numeroPedido) {
        existe = true;
        break;
      }
    }
    if (!existe) {
      pedidos.push(pedidoFijo);
    }
  }

  setLocalStorage(pedidosKey, pedidos);

  //define las piezas fijas
  const piezasFijas = [
    {
      numeroPieza: 1,
      numeroPedido: 1,
      largo: 50,
      ancho: 30,
      grosor: 2,
      color: "Natural",
      ambasCaras: false,
      cortada: false
    },
    {
      numeroPieza: 2,
      numeroPedido: 2,
      largo: 100,
      ancho: 40,
      grosor: 3,
      color: "Nogal",
      ambasCaras: true,
      cortada: true
    }
  ];

  //mirar que las piezas fijas estén siempre en LocalStorage
  for (let i = 0; i < piezasFijas.length; i++) {
    const piezaFija = piezasFijas[i];
    let existe = false;
    for (let j = 0; j < piezas.length; j++) {
      if (piezas[j].numeroPieza === piezaFija.numeroPieza) {
        existe = true;
        break;
      }
    }
    if (!existe) {
      piezas.push(piezaFija);
    }
  }

  setLocalStorage(piezasKey, piezas);
}//final de la funcion cargarDatosIniciales()

document.addEventListener("DOMContentLoaded", () => {
  cargarDatosIniciales(); //carga los datos iniciales
  const pedidoForm = document.getElementById("pedidoForm");
  if (pedidoForm) {
    pedidoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const numeroPedido = parseInt(document.getElementById("numeroPedido").value);
      const cliente = document.getElementById("cliente").value;
      const fechaPedido = document.getElementById("fechaPedido").value;
      const procesado = document.getElementById("procesado").checked;
      const servido = document.getElementById("servido").checked;

      if (new Date(fechaPedido) > new Date()) {
        alert("La fecha no puede ser futura.");
        return;
      }

      const pedidos = getLocalStorage(pedidosKey);
      for (let i = 0; i < pedidos.length; i++) {
        if (pedidos[i].numeroPedido === numeroPedido) {
          alert("Este número de pedido ya existe.");
          return;
        }
      }

      pedidos.push({ numeroPedido, cliente, fechaPedido, procesado, servido, piezas: [] });
      setLocalStorage(pedidosKey, pedidos);
      alert("Pedido guardado.");
    });
  }

  const piezaForm = document.getElementById("piezaForm");
  if (piezaForm) {
    piezaForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const numeroPieza = parseInt(document.getElementById("numeroPieza").value);
      const numeroPedido = parseInt(document.getElementById("numeroPedidoPieza").value);
      const largo = parseFloat(document.getElementById("largo").value);
      const ancho = parseFloat(document.getElementById("ancho").value);
      const grosor = parseFloat(document.getElementById("grosor").value);
      const color = document.getElementById("color").value || "Natural";
      const ambasCaras = document.getElementById("ambasCaras").checked;
      const cortada = document.getElementById("cortada").checked;

      const pedidos = getLocalStorage(pedidosKey);
      let pedidoExiste = false;
      for (let i = 0; i < pedidos.length; i++) {
        if (pedidos[i].numeroPedido === numeroPedido) {
          pedidoExiste = true;
          break;
        }
      }

      if (!pedidoExiste) {
        alert("El número de pedido no existe.");
        return;
      }

      const piezas = getLocalStorage(piezasKey);
      for (let i = 0; i < piezas.length; i++) {
        if (piezas[i].numeroPieza === numeroPieza) {
          alert("Este número de pieza ya existe.");
          return;
        }
      }

      piezas.push({ numeroPieza, numeroPedido, largo, ancho, grosor, color, ambasCaras, cortada });
      setLocalStorage(piezasKey, piezas);
      alert("Pieza guardada.");
    });
  }

  const detallePedidoForm = document.getElementById("detallePedidoForm");
  if (detallePedidoForm) {
    detallePedidoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const numeroPedido = parseInt(document.getElementById("detalleNumeroPedido").value);
      const piezas = getLocalStorage(piezasKey).filter((p) => p.numeroPedido === numeroPedido);
      const detalleLista = document.getElementById("detalleLista");

      if (piezas.length === 0) {
        detalleLista.innerHTML = "No se encontraron piezas para este pedido.";
        return;
      }

      let superficie = 0, volumen = 0;
      let rows = "";
      for (let i = 0; i < piezas.length; i++) {
        const pieza = piezas[i];
        const area = pieza.largo * pieza.ancho;
        const vol = area * pieza.grosor;
        superficie += area;
        volumen += vol;
        rows += `
          <tr>
            <td>${pieza.numeroPieza}</td>
            <td>${pieza.largo}</td>
            <td>${pieza.ancho}</td>
            <td>${pieza.grosor}</td>
            <td>${pieza.color}</td>
          </tr>`;
      }

      detalleLista.innerHTML = `
        <table border="1">
          <thead>
            <tr>
              <th>Número de Pieza</th>
              <th>Largo (cm)</th>
              <th>Ancho (cm)</th>
              <th>Grosor (cm)</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <p>Superficie Total: ${superficie} cm²</p>
        <p>Volumen Total: ${volumen} cm³</p>
      `;
    });
  }
});