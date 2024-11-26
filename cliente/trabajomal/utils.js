function mostrarPagina(pagina) {
    switch (pagina) {
      case 'pedidos':
        mostrarPaginaPedidos();
        break;
      case 'piezas':
        mostrarPaginaPiezas();
        break;
      case 'detalles':
        mostrarPaginaDetalles();
        break;
      default:
        console.error('Página no reconocida:', pagina);
    }
  }
  
  