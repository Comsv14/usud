function operadorTernario() {
    // Operador ternario
    // expresion ? si es true : si es false
    let num = prompt("Introduce un numero");
    num > 0 ? alert("Es positivo") : alert("Es negativo");
}
function for_of() {
    let animales = ["perro", "gato", "loro"];
    for (let animal of animales) {
        alert(animal);
    }
}
function for_in() {
    //foreach de manual
    let animales = ["perro", "gato", "loro"];
    for (let i in animales) {
        alert(animales[i]);
    }
}
function for_in_objeto() {
    let persona = {
        nombre: "Samuel",
        apellido: "Martos"
    };
    for (let propiedad in persona) {
        alert(persona[propiedad]);
    }
}
function constructor() {
    function Usuario() {
        this.id =1;
        this.recuperarClave = function() {
            console.log("Recuperar clave");
        }
    }
    let user = new Usuario();
    console.log(usuario);
    //user.recuperarClave();
}