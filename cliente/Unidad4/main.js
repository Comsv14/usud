// Objeto que contiene métodos para manejar pedidos y piezas
const gestorPedidos = {
    crearPedido: function () {
        const pedido = {
            numeroPedido: parseInt(prompt("Número de pedido:")),
            cliente: prompt("Nombre y apellidos del cliente:"),
            fechaPedido: prompt("Fecha del pedido (YYYY-MM-DD):"),
            procesado: false, // Por defecto no procesado
            servido: false, // Por defecto no servido
            piezas: [] // Lista de piezas asociadas
        };

        const numeroPiezas = parseInt(prompt("¿Cuántas piezas tiene este pedido?"));

        for (let i = 0; i < numeroPiezas; i++) {
            console.log(`--- Información de la pieza ${i + 1} ---`);
            const pieza = {
                numeroPieza: parseInt(prompt(`Número único para la pieza ${i + 1}:`)),
                largo: parseFloat(prompt("Largo de la pieza (cm):")),
                ancho: parseFloat(prompt("Ancho de la pieza (cm):")),
                grosor: parseFloat(prompt("Grosor de la pieza (cm):")),
                color: prompt("Color del chapeado (Natural si no lleva):"),
                ambasCaras: confirm("¿La pieza está chapeada en ambas caras?"),
                cortada: confirm("¿La pieza ya está cortada?")
            };
            pedido.piezas.push(pieza); // Añadimos la pieza al pedido
        }

        return pedido;
    },

    mostrarPedido: function (pedido) {
        console.log(`\n--- Pedido Nº ${pedido.numeroPedido} ---`);
        console.log(`Cliente: ${pedido.cliente}`);
        console.log(`Fecha del pedido: ${pedido.fechaPedido}`);
        console.log(`Procesado: ${pedido.procesado}`);
        console.log(`Servido: ${pedido.servido}`);
        console.log(`Piezas:`);
        pedido.piezas.forEach((pieza, index) => {
            console.log(`  Pieza ${index + 1}:`);
            console.log(`    Número: ${pieza.numeroPieza}`);
            console.log(`    Dimensiones: ${pieza.largo}cm x ${pieza.ancho}cm x ${pieza.grosor}cm`);
            console.log(`    Color: ${pieza.color}`);
            console.log(`    Ambas caras: ${pieza.ambasCaras}`);
            console.log(`    Cortada: ${pieza.cortada}`);
        });
    }
};

// Función principal (main)
function main() {
    console.log("Gestor de pedidos");
    const pedido = gestorPedidos.crearPedido();
    gestorPedidos.mostrarPedido(pedido);
}

// Ejecutamos el programa
main();
