// Clase Persona: Representa a una persona con su nombre, peso y altura
class Persona {
    constructor(nombre, peso, altura) {
        this.nombre = nombre;
        this.peso = peso;
        this.altura = altura;
    }

    calcularIMC() {
        return (this.peso / (this.altura ** 2)).toFixed(2);
    }

    obtenerEstado() {
        const imc = parseFloat(this.calcularIMC());
        if (imc < 18.5) return "delgada";
        if (imc <= 24.9) return "normal";
        return "con sobrepeso";
    }
}

// Función para cargar datos desde localStorage
function cargarPersonas() {
    const personasGuardadas = localStorage.getItem('personas');
    return personasGuardadas ? JSON.parse(personasGuardadas).map(data => new Persona(data.nombre, data.peso, data.altura)) : [];
}

// Función para guardar datos en localStorage
function guardarPersonas(personas) {
    localStorage.setItem('personas', JSON.stringify(personas));
}

// Lista de personas
let personas = cargarPersonas();

// Función para mostrar la lista de personas en la página
function mostrarPersonas() {
    const lista = document.getElementById("listaPersonas");
    lista.innerHTML = "";

    personas.forEach(persona => {
        const item = document.createElement("li");
        item.textContent = `${persona.nombre}: Peso = ${persona.peso}kg, Altura = ${persona.altura}m`;
        lista.appendChild(item);
    });
}

// Función para agregar una persona
function agregarPersona(nombre, peso, altura) {
    if (nombre && peso > 0 && altura > 0) {
        personas.push(new Persona(nombre, peso, altura));
        guardarPersonas(personas);
        alert(`Persona añadida: ${nombre}`);
        mostrarPersonas();
    } else {
        alert("Por favor, introduce datos válidos.");
    }
}

// Función para calcular y mostrar el IMC de todas las personas
function mostrarIMC() {
    if (personas.length > 0) {
        const resultados = personas.map(persona => `${persona.nombre}: IMC = ${persona.calcularIMC()}, Estado = ${persona.obtenerEstado()}`);
        alert(resultados.join("\n"));
    } else {
        alert("No hay personas registradas.");
    }
}

// Eventos de los botones
document.getElementById("Agregar").addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value;
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    agregarPersona(nombre, peso, altura);
});

document.getElementById("Calcular").addEventListener("click", mostrarIMC);

mostrarPersonas(); // Mostrar lista al cargar la página
