class piezas extends pedidos{
    constructor(numeroPieza, numeroPedido, largo, ancho, grosor, color = "Natural", ambasCaras = false, cortada = false) {
        this.numeroPieza = numeroPieza; // Número entero único
        this.numeroPedido = numeroPedido; // Relación con un pedido
        this.largo = largo; // Decimal, largo de la pieza en cm
        this.ancho = ancho; // Decimal, ancho de la pieza en cm
        this.grosor = grosor; // Decimal, grosor de la pieza en cm
        this.color = color; // Cadena, color del chapeado
        this.ambasCaras = ambasCaras; // Booleano, si está chapeada en ambas caras
        this.cortada = cortada; // Booleano, si está cortada
      }
      // Métodos opcionales
      cortarPieza() {
        this.cortada = true;
      }
}