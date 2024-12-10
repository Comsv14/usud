let pedidos = [];
let piezas = [];

class Pieza {
    constructor(numPieza, numPedido, largo, ancho, grosor, color, chapeado) {
        this.numPieza = numPieza;
        this.numPedido = numPedido;
        this.largo = largo;
        this.ancho = ancho;
        this.grosor = grosor;
        this.color = color;
        this.chapeado = chapeado;
    }
    toString() {
        return `Pieza ${this.numPieza} || Pedido: ${this.numPedido} || Largo: ${this.largo} cm. || Ancho: ${this.ancho} cm. || Grosor: ${this.grosor} cm. || Color: ${this.color} || Chapeado: ${this.chapeado}`;
    }
}

class Pedido {
    constructor(numPedido, cliente, fecha, procesado, servido) {
        this.numPedido = numPedido;
        this.cliente = cliente;
        this.fecha = fecha;
        this.procesado = procesado;
        this.servido = servido;
    }
    toString() {
        return `Pedido ${this.numPedido} || Cliente: ${this.cliente} || Fecha: ${this.fecha} || Procesado: ${this.procesado} || Servido: ${this.servido}`;
    }
}
function mostrarPedidos(event) {
    //localStorage.clear();
    if (event) event.preventDefault();
    const listaPedidos = document.getElementById("listaPedidos");
    listaPedidos.innerHTML = "<h1>Pedidos Registrados</h1>";

    if (pedidos.length === 0) {
        listaPedidos.innerHTML += "<p>No hay pedidos registrados.</p>";
        return;
    }

    pedidos.forEach(pedido => {
        const fila = document.createElement("p");
        fila.textContent = pedido.toString();
        listaPedidos.appendChild(fila);
    });
}
function mostrarPiezas(event) {
    if (event) event.preventDefault();
    const listaPiezas = document.getElementById("listaPiezas");
    listaPiezas.innerHTML = "<h1>Piezas Registradas</h1>";

    if (piezas.length === 0) {
        listaPiezas.innerHTML += "<p>No hay piezas registradas.</p>";
        return;
    }

    piezas.forEach(pieza => {
        const fila = document.createElement("p");
        fila.textContent = pieza.toString();
        listaPiezas.appendChild(fila);
    });
}
function realizarPedido(event) {
    event.preventDefault();
    const numPedido = parseInt(document.getElementById("numPedido").value);
    const cliente = document.getElementById("cliente").value;
    const fecha = document.getElementById("fecha").value;
    const procesado = document.getElementById("procesadoSi").checked;
    const servido = document.getElementById("servidoSi").checked;

    if (isNaN(numPedido) || numPedido <= 0) {
        alert("El número de pedido debe ser un valor numérico válido y mayor que 0.");
        return;
    }
    if (cliente.trim() === "") {
        alert("El nombre del cliente no puede estar vacío.");
        return;
    }
    if (fecha.trim() === "") {
        alert("La fecha no puede estar vacía.");
        return;
    }

    if (buscarPedido(numPedido)) {
        alert("Ya existe un pedido con ese número de pedido.");
        return;
    }

    const pedido = new Pedido(numPedido, cliente, fecha, procesado, servido);
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    alert(`Pedido realizado: ${pedido.toString()}`);
    mostrarPedidos(event);
}
function aniadirPieza(event) {
    event.preventDefault();
    const numPieza = parseInt(document.getElementById("numPieza").value);
    const numPedido = parseInt(document.getElementById("numPedidoPieza").value);
    const largo = parseFloat(document.getElementById("largo").value);
    const ancho = parseFloat(document.getElementById("ancho").value);
    const grosor = parseFloat(document.getElementById("grosor").value);
    const color = document.getElementById("color").value;
    const chapeado = document.getElementById("chapeadoSi").checked;

    if (isNaN(numPieza) || numPieza <= 0) {
        alert("El número de pieza debe ser un valor numérico válido y mayor que 0.");
        return;
    }
    if (isNaN(numPedido) || numPedido <= 0) {
        alert("El número de pedido debe ser un valor numérico válido y mayor que 0.");
        return;
    }
    if (isNaN(largo) || largo <= 0) {
        alert("El largo debe ser un valor numérico válido y mayor que 0.");
        return;
    }
    if (isNaN(ancho) || ancho <= 0) {
        alert("El ancho debe ser un valor numérico válido y mayor que 0.");
        return;
    }
    if (isNaN(grosor) || grosor <= 0) {
        alert("El grosor debe ser un valor numérico válido y mayor que 0.");
        return;
    }
    if (color.trim() === "") {
        alert("El color no puede estar vacío.");
        return;
    }

    if (!buscarPedido(numPedido)) {
        alert("No existe un pedido con ese número de pedido.");
        return;
    }

    if (buscarPieza(numPieza)) {
        alert("Ya existe una pieza con ese número de pieza.");
        return;
    }

    const pieza = new Pieza(numPieza, numPedido, largo, ancho, grosor, color, chapeado);
    piezas.push(pieza);
    localStorage.setItem("piezas", JSON.stringify(piezas));
    alert(`Pieza agregada: ${pieza.toString()}`);
    mostrarPiezas(event);
}
function buscarPieza(numPiezaB) {
    return piezas.some(pieza => pieza.numPieza === numPiezaB);
}
function buscarPedido(numPedidoB) {
    return pedidos.some(pedido => pedido.numPedido === numPedidoB);
}
function eliminarPieza(event) {
    event.preventDefault();
    const numPiezaE = prompt("Introduce el numPieza de la pieza a eliminar:");
    if (!numPiezaE) {
        alert("El número de pieza no puede estar vacío.");
        return;
    }
    const numPiezaInt = parseInt(numPiezaE);
    if (isNaN(numPiezaInt)) {
        alert("El número de pieza no es válido.");
        return;
    }
    const index = piezas.findIndex(p => p.numPieza === numPiezaInt);

    if (index === -1) {
        alert("Pieza no encontrada.");
        return;
    }
    piezas.splice(index, 1);
    localStorage.setItem("piezas", JSON.stringify(piezas));

    alert("Pieza eliminada correctamente.");
    mostrarPiezas(event);
}
function eliminarPedido(event) {
    event.preventDefault();
    const numPedidoE = prompt("Introduce el numPedido del pedido a eliminar:");
    if (!numPedidoE) {
        alert("El número de pedido no puede estar vacío.");
        return;
    }
    const numPedidoInt = parseInt(numPedidoE);
    if (isNaN(numPedidoInt)) {
        alert("El número de pedido no es válido.");
        return;
    }
    const index = pedidos.findIndex(p => p.numPedido === numPedidoInt);

    if (index === -1) {
        alert("Pedido no encontrado.");
        return;
    }
    pedidos.splice(index, 1);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    alert("Pedido eliminado correctamente.");
    mostrarPedidos(event);
}

function modificarPieza() {
    const numPiezaM = prompt("Introduce el numPieza de la pieza a modificar:");
    if (!numPiezaM) {
        alert("El número de pieza no puede estar vacío.");
        return;
    }
    const numPiezaInt = parseInt(numPiezaM);
    if (isNaN(numPiezaInt)) {
        alert("El número de pieza no es válido.");
        return;
    }

    const index = piezas.findIndex(p => p.numPieza === numPiezaInt);
    if (index === -1) {
        alert("Pieza no encontrada.");
        return;
    }

    const pieza = piezas[index];
    const confirmModificacion = confirm(`¿Quieres modificar la pieza con numPieza ${pieza.numPieza}?`);

    if (!confirmModificacion) {
        alert("Modificación cancelada.");
        return;
    }

    const numPieza = prompt("Introduce el nuevo numPieza:", pieza.numPieza);
    if (numPieza === null || numPieza.trim() === "") {
        alert("El nuevo número de pieza no puede estar vacío.");
        return;
    }

    const numPedido = prompt("Introduce el nuevo numPedido:", pieza.numPedido);
    if (numPedido === null || isNaN(parseInt(numPedido))) {
        alert("El nuevo número de pedido debe ser un valor numérico válido.");
        return;
    }

    const largo = prompt("Introduce el nuevo largo:", pieza.largo);
    if (largo === null || isNaN(parseFloat(largo))) {
        alert("El nuevo largo debe ser un valor numérico válido.");
        return;
    }

    const ancho = prompt("Introduce el nuevo ancho:", pieza.ancho);
    if (ancho === null || isNaN(parseFloat(ancho))) {
        alert("El nuevo ancho debe ser un valor numérico válido.");
        return;
    }

    const grosor = prompt("Introduce el nuevo grosor:", pieza.grosor);
    if (grosor === null || isNaN(parseFloat(grosor))) {
        alert("El nuevo grosor debe ser un valor numérico válido.");
        return;
    }

    const color = prompt("Introduce el nuevo color:", pieza.color);
    if (color === null || color.trim() === "") {
        alert("El color no puede estar vacío.");
        return;
    }

    const chapeado = confirm("¿La pieza está chapeada?");
    pieza.numPieza = parseInt(numPieza);
    pieza.numPedido = parseInt(numPedido);
    pieza.largo = parseFloat(largo);
    pieza.ancho = parseFloat(ancho);
    pieza.grosor = parseFloat(grosor);
    pieza.color = color;
    pieza.chapeado = chapeado;

    localStorage.setItem("piezas", JSON.stringify(piezas));
    alert("Pieza modificada correctamente.");
    mostrarPiezas();
}

window.onload = function () {
    const datosPedidos = localStorage.getItem("pedidos");
    if (datosPedidos) {
        pedidos = JSON.parse(datosPedidos).map(p => new Pedido(p.numPedido, p.cliente, p.fecha, p.procesado, p.servido));
    }

    const datosPiezas = localStorage.getItem("piezas");
    if (datosPiezas) {
        piezas = JSON.parse(datosPiezas).map(p => new Pieza(p.numPieza, p.numPedido, p.largo, p.ancho, p.grosor, p.color, p.chapeado));
    }
    mostrarPedidos();
    mostrarPiezas();
};
