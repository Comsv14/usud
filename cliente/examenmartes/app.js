//primero se define cada clase, persona e imc con sus respectivos metodos
class Persona {
    constructor(nombre, peso, altura) {
        this.nombre = nombre; // El nombre de la persona
        this.peso = peso; // El peso de la persona (en kg)
        this.altura = altura; // La altura de la persona (en metros)
    }
    // Método para calcular el Índice de Masa Corporal (IMC)
    calcularIMC() {
        return (this.peso / (this.altura ** 2)).toFixed(2); // Fórmula del IMC
    }

    // Método para obtener el estado según el IMC
    obtenerEstado() {
        const imc = parseFloat(this.calcularIMC()); // Convertir el IMC a número
        if (imc < 18.5) {
            return "delgada"; // IMC menor a 18.5

        } else if (imc >= 18.5 && imc <= 24.9) {
            return "normal"; // IMC entre 18.5 y 24.9
        } else {
            return "con sobrepeso"; // IMC mayor a 24.9
        }
    }
}
//clase imc con 
class imc {
    constructor(nombre, imc) {
        this.nombre = nombre; 
        this.imc = imc;
    }

}

//función para guardar un pedido en LocalStorage
function guardarPersona(event) {
    //evita el comportamiento por defecto de recargar la página
    event.preventDefault();  
  
    let nombre = document.getElementById('nombre').value;
    let peso = document.getElementById('peso').value;
    let estatura = document.getElementById('estatura').value;
  
    let persona = {
      nombre: nombre,
      peso: parseInt(peso),
      estatura:  parseInt(estatura)
    };
    //guardar en localstorage con la clave 'pedido_ID'
    //convierte el objeto pedido en una cadena json que se veria asi'{"id":123,"cliente":"Juan Pérez","fecha":"2024-11-27"}' porque el localstorage solo guarda cadenas
    localStorage.setItem('persona' + persona.nombre, JSON.stringify(persona)); 
  
    alert('Pedido guardado exitosamente');
    document.getElementById('pedidoForm').reset();  // Limpiar el formulario
  }
  //funcion para buscar un pedido en LocalStorage por su ID
  function buscarPersona() {
    let buscarNombre = document.getElementById('buscarId').value;
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
  




