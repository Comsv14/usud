/*Crea una aplicación con las siguientes clases:
Clase Estudiante:
Nombre
Nota
Clase Resultado:
Nombre
Estado (Aprobado o Suspendido)
Requisitos:
AÑADIR: El usuario podrá introducir el nombre y la nota de varios estudiantes.
MODIFICAR: El usuario podrá modificar el nombre y/o la nota de un estudiante ya dado de alta.
CALCULAR: Determina si cada estudiante está aprobado o suspendido:
Aprobado: Nota mayor o igual a 5.
Suspendido: Nota menor a 5.
Muestra una lista con el nombre de cada estudiante y su estado (Aprobado o Suspendido).
Guarda en la clase Resultado los nombres y los estados de los estudiantes que estén suspendidos. */
class Estudiante {
    constructor(nombre, apellido, nota1, nota2, nota3) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.nota3 = nota3;
    }
}

class Resultado {
    CalcularMedia(estudiante) {
        const media = (parseFloat(estudiante.nota1) + parseFloat(estudiante.nota2) + parseFloat(estudiante.nota3)) / 3;
        let estado;
        
        if (media >= 5 && media < 6) {
            estado = 'Suficiente';
        } else if (media >= 6 && media < 7) {
            estado = 'Bien';
        } else if (media >= 7 && media < 9) {
            estado = 'Notable';
        } else if (media < 5) {
            estado = 'Insuficiente';
        } else if (media >= 9 && media <= 10) {
            estado = 'Sobresaliente';
        }
        return { media: media.toFixed(2), estado };
    }
}

// Variables globales
const estudiantes = [];
const calculo = new Resultado();

// Cargar los datos de LocalStorage al iniciar la página
window.onload = function () {
    cargarEstudiantes();
    actualizarTabla();
};

function anadirAlumno() {
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const nota3 = parseFloat(document.getElementById('nota3').value);

    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || nota1 > 10 || nota2 > 10 || nota3 > 10) {
        alert('Las notas deben ser números entre 0 y 10.');
        limpiarCampos();
        return;
    }

    if (nombre && apellido && nota1 && nota2 && nota3) {
        const nuevoAlumno = new Estudiante(nombre, apellido, nota1, nota2, nota3);
        estudiantes.push(nuevoAlumno);
        guardarEstudiantes();
        actualizarTabla();
        limpiarCampos();
    } else {
        alert('Completa todos los campos');
    }
}

function modificarAlumno() {
    const nombre = document.getElementById('nombre').value.trim();
    const estudiante = estudiantes.find(e => e.nombre === nombre);

    if (estudiante) {
        const nota1 = parseFloat(document.getElementById('nota1').value);
        const nota2 = parseFloat(document.getElementById('nota2').value);
        const nota3 = parseFloat(document.getElementById('nota3').value);

        estudiante.nota1 = nota1;
        estudiante.nota2 = nota2;
        estudiante.nota3 = nota3;
        guardarEstudiantes();
        actualizarTabla();
        limpiarCampos();
    } else {
        alert('La persona no está registrada en el sistema.');
    }
}

function eliminarAlumno() {
    const nombre = document.getElementById('nombre').value.trim();
    const indice = estudiantes.findIndex(e => e.nombre === nombre);

    if (indice !== -1) {
        estudiantes.splice(indice, 1);
        guardarEstudiantes();
        actualizarTabla();
        limpiarCampos();
    } else {
        alert('La persona no está registrada en el sistema.');
    }
}

function calcularMedia() {
    const tabla = document.getElementById('tablaEstudiantes').querySelector('tbody');
    tabla.innerHTML = '';

    estudiantes.forEach(estudiante => {
        const resultado = calculo.CalcularMedia(estudiante);
        const fila = `
            <tr>
                <td>${estudiante.nombre}</td>
                <td>${estudiante.apellido}</td>
                <td>${estudiante.nota1}</td>
                <td>${estudiante.nota2}</td>
                <td>${estudiante.nota3}</td>
                <td>${resultado.media}</td>
                <td>${resultado.estado}</td>
                
            </tr>
        `;
        tabla.innerHTML += fila;
    });
    actualizarListaSuspensos();
}

function actualizarTabla() {
    const tabla = document.getElementById('tablaEstudiantes').querySelector('tbody');
    tabla.innerHTML = '';

    estudiantes.forEach(estudiante => {
        const resultado = calculo.CalcularMedia(estudiante);
        const fila = `
            <tr>
                <td>${estudiante.nombre}</td>
                <td>${estudiante.apellido}</td>
                <td>${estudiante.nota1}</td>
                <td>${estudiante.nota2}</td>
                <td>${estudiante.nota3}</td>
                <td>-</td>
                <td>-</td>
                
            </tr>
        `;
        tabla.innerHTML += fila;
    });
}
function actualizarListaSuspensos() {
const lista = document.getElementById('listaNotas');
lista.innerHTML = '';

estudiantes.forEach(estudiante => {
const { media, estado } = calculo.CalcularMedia(estudiante);
if (estado === 'Insuficiente') {
    lista.innerHTML += `<li>${estudiante.nombre} ${estudiante.apellido}: ${media}</li>`;
}
});
}

function limpiarCampos() {
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('nota1').value = '';
    document.getElementById('nota2').value = '';
    document.getElementById('nota3').value = '';
}

// Función para guardar los estudiantes en LocalStorage
function guardarEstudiantes() {
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
}

// Función para cargar los estudiantes desde LocalStorage
function cargarEstudiantes() {
    const datos = localStorage.getItem('estudiantes');
    if (datos) {
        const arrayEstudiantes = JSON.parse(datos);
        arrayEstudiantes.forEach(e => {
            estudiantes.push(new Estudiante(e.nombre, e.apellido, e.nota1, e.nota2, e.nota3));
        });
    }
}