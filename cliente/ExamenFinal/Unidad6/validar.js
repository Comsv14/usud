const inicializar = () =>
  document.getElementById("enviar").addEventListener("click", validar, false);

const validaElemento = (nombre) => {
    let elemento = document.getElementById(nombre);
    if (!elemento.checkValidity()) {
      if (elemento.validity.valueMissing)
        error(elemento, "Debe introducir un nombre");
      return false;
    }
    return true;
  };



const error = (elemento, mensaje) => {
  document.getElementById("mensajeError").innerHTML =
    mensaje === "" ? elemento.validationMessage : mensaje;
  elemento.className = "error";
  elemento.focus();
};

const borrarError = () => {
    let formulario = document.forms[0];
    formulario.elements.forEach((e) => e.className = "");
};
const validar = (e) => {
    if (
      validaElemento("nombre") &&
      validaElemento("edad") &&
      confirm("Pulsa enviar si quieres mandar el formulario")
    )
      return true;
    else {
      e.preventDefault();
      return false;
    }
};