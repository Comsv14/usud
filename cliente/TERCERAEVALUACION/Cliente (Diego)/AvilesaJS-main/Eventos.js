/**
 * Inicializa los controles desde el DOM
 */
const loadControls = () => {
  const txtNumero = document.getElementById("txtNumero");
  const cbOrigen = document.getElementById("cbOrigen");
  const cbDestino = document.getElementById("cbDestino");
  const txtHoraSalida = document.getElementById("txtHoraSalida");
  const txtIntervalo = document.getElementById("txtIntervalo");
  const editLinea = document.getElementById("editLinea");
  const btnAnyadir = document.getElementById("btnAnyadir");
  const btnEliminar = document.getElementById("btnEliminar");
  const btnModificar = document.getElementById("btnModificar");
};

/**
 * Manejador de evento que muestra el bloque para añadir una nueva línea
 */
const showAnyadirLineaEvt = function () {
  
  if (editLinea) {
    enableActions(false);
    editLinea.style = "display:block;";
    hijos = editLinea.childNodes;

    for (let h of hijos) {
      h.value = "";
      h.disabled = "";
    }
  }
};

/**
 * Manejador de evento que muestra el bloque para editar una línea existente
 */
const showEditarLineaEvt = () => {
  numero = prompt("Introduce número de línea","");
  if (isNaN(numero)) {
    alert("Número no válido");
  }
  else if (numero){
    // Ahora se mira si la línea existe
    if (!existeLinea(numero))
    {
      alert("La línea introducida no existe")
    }
    else if (editLinea) {
      editLinea.style = "display:block;";
      txtNumero.disabled = "disabled";
      txtNumero.value = parseInt(numero);
      enableActions(false);
    }
  }
};

/**
 * Habilita/deshabilita los botones de acción 
 * @param {} enabled <b>true</b> para habilitar <b>false</b> para deshabilitar
 */
const enableActions = (enabled) => {
  console.log(enabled);
  btnAnyadir.disabled = !Boolean(enabled);
  btnModificar.disabled = !Boolean(enabled);
  btnEliminar.disabled = !Boolean(enabled);
}
const accionLineaEvt = () => {
  if (txtNumero) {
    let numero = parseInt(txtNumero.value);
    if (isNaN(numero)) alert("El número introducido no es válido");
    else if (cbOrigen.value === cbDestino.value)
      alert("El origen no puede ser igual al destino");
    else if (!checkHora(txtHoraSalida)) alert("La hora de salida no es válida");
    else if (txtNumero.disabled) {
      modificarLineaPorNumero(
        numero,
        cbOrigen.value,
        cbDestino.value,
        txtHoraSalida.value,
        txtIntervalo.value
      );
      limpiaFormLinea();
      enableActions(true);
    } else {
      if (existeLinea(numero)) alert("El número de línea ya existe");
      else
        insertaLinea(
          numero,
          cbOrigen.value,
          cbDestino.value,
          txtHoraSalida.value,
          txtIntervalo.value
        );
      limpiaFormLinea();
      enableActions(true);
    }
  }
};

const limpiaFormLinea = () => {
  lineas = getLineas();
  loadData();

  hijos = editLinea.childNodes;
  for (let h of hijos) {
    h.value = "";
  }
  editLinea.style = "display:none;";
};
const eliminarLineasEvt = () => {
  numeroLinea = prompt("Introduce número de línea");
  numeroLinea = parseInt(numeroLinea);
  if (numeroLinea && isNaN(numeroLinea)) alert("El número de línea introducido no es válido");
  else eliminaLineaPorNumero(numeroLinea);
  loadData();
};

const modificarLineasEvt = () => {
  lineas = getLineas();
  console.log(lineas);
  loadData();
};
