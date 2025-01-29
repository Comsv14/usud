class Persona {
    constructor(nombre, peso, altura) {
        this.nombre = nombre;
        this.peso = parseFloat(peso);
        this.altura = parseFloat(altura);
    }

    modificarUsuario(nuevoPeso, nuevaAltura) {
        this.peso = nuevoPeso;
        this.altura = nuevaAltura;
    }
}

class CalculoIMC {
    constructor() {
        this.registroIMC = [];
    }

    CalcularIMC(persona) {
        const imc = persona.peso / (persona.altura ** 2);
        let estado;

        if (imc >= 0 && imc <= 18.48) {
            estado = 'Demasiado delgada';
        } else if (imc >= 18.49 && imc <= 24.99) {
            estado = 'Peso normal';
        } else {
            estado = 'Demasiado obesa';
            this.registrarPersona(persona.nombre, imc.toFixed(2));
        }

        return { imc: imc.toFixed(2), estado };
    }

    registrarPersona(nombre, imc) {
        this.registroIMC.push({ nombre, imc });
    }

    obtenerRegistroFueraRango() {
        return this.registroIMC;
    }
}

// Variables globales
const personas = [];
const calculo = new CalculoIMC();

// Funciones
function anadirPersona() {
    const nombre = document.getElementById('nombre').value.trim();
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;

    if (nombre && peso && altura) {
        const nuevaPersona = new Persona(nombre, peso, altura);
        personas.push(nuevaPersona);
        actualizarTabla();
        limpiarCampos();
    } else {
        alert('Completa todos los campos.');
    }
}

function modificarPersona() {
    const nombre = document.getElementById('nombre').value.trim();
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;

    const persona = personas.find(p => p.nombre === nombre);

    if (persona) {
        persona.modificarUsuario(peso, altura);
        actualizarTabla();
        limpiarCampos();
    } else {
        alert('La persona no está registrada.');
    }
}

function calcularIMC() {
    const tabla = document.getElementById('tablaPersonas').querySelector('tbody');
    tabla.innerHTML = ''; // Limpiar tabla

    personas.forEach(persona => {
        const resultado = calculo.CalcularIMC(persona);
        const fila = `
            <tr>
                <td>${persona.nombre}</td>
                <td>${persona.peso}</td>
                <td>${persona.altura}</td>
                <td>${resultado.imc}</td>
                <td>${resultado.estado}</td>
            </tr>
        `;
        tabla.innerHTML += fila; // Actualizar la tabla
    });

    actualizarListaFueraRango();
}

function actualizarTabla() {
    const tabla = document.getElementById('tablaPersonas').querySelector('tbody');
    tabla.innerHTML = '';

    personas.forEach(persona => {
        const fila = `
            <tr>
                <td>${persona.nombre}</td>
                <td>${persona.peso}</td>
                <td>${persona.altura}</td>
                <td>-</td>
                <td>-</td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });
}

function actualizarListaFueraRango() {
    const lista = document.getElementById('listaFueraRango');
    lista.innerHTML = '';

    calculo.obtenerRegistroFueraRango().forEach(({ nombre, imc }) => {
        const elemento = `<li>${nombre}: IMC ${imc}</li>`;
        lista.innerHTML += elemento;
    });
}

function limpiarCampos() {
    document.getElementById('nombre').value = '';
    document.getElementById('peso').value = '';
    document.getElementById('altura').value = '';
}