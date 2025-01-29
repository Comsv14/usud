class pedidos {
    constructor(numeroPedido, cliente, fechaPedido, procesado = false, servido = false) {
      this.numeroPedido = numeroPedido; // Número entero único
      this.cliente = cliente; // Cadena, nombre y apellidos (máx. 50 caracteres)
      this.fechaPedido = new Date(fechaPedido); // Fecha de realización del pedido
      this.procesado = procesado; // Booleano, si ha sido procesado
      this.servido = servido; // Booleano, si ha sido servido
      this.piezas = []; // Colección de piezas (instancias de Pieza)
    }
  
    // Métodos
    agregarPieza(pieza) {
      if (pieza.numeroPedido !== this.numeroPedido) {
        throw new Error("La pieza no pertenece a este pedido.");
      }
      this.piezas.push(pieza);
    }
  
    marcarProcesado() {
      this.procesado = true;
    }
  
    marcarServido() {
      if (this.piezas.every(p => p.cortada)) {
        this.servido = true;
      } else {
        this.servido = false;
        //throw new Error("No se puede marcar como servido: aún hay piezas sin cortar.");
      }
    }
  
    obtenerResumen() {
      return {
        numeroPedido: this.numeroPedido,
        cliente: this.cliente,
        fechaPedido: this.fechaPedido,
        procesado: this.procesado,
        servido: this.servido,
        totalPiezas: this.piezas.length,
      };
    }
    
  }
