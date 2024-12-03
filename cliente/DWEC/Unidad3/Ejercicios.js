function vernumeros(){
    /* Hacer un programa que contenga una función llamada vernumeros() que permita visualizar los 10 primeros números tantas veces como queramos. */

    let final = prompt('¿Cuantas veces quieres ver los 10 primeros numeros?');
    parseInt(final);

    for (let i = 1; i <= final; i++) {
        for (let j = 0; j <=10; j++) {
            document.write(j, " ");
            
        }
        document.write("<br>");
        
    }
}

function multiplo3() {
    /*Hacer un programa mediante una función que verifique si un número es múltiplo de 3. Que el script se pueda repetir si el usuario quiere.
    */
    let continuar = 's';
    do {
        let numero = parseInt(prompt('Dime un número: '), 10);

        if (numero % 3 === 0) {
            alert(numero + ' es múltiplo de 3.');
        } else {
            alert(numero + ' no es múltiplo de 3.');
        }

        continuar = prompt('¿Quieres continuar? S/N').toLowerCase();
    } while (continuar === 's');
    document.write("FIN DE PROGRAMA");
}
function ejercicio3() {
    /*Hacer un programa mediante una función que reciba tres valores y devuelva el mayor de ellos.
    */
    let num1= parseInt(prompt('¿Cual es el primer número? '), 10);
    let num2= parseInt(prompt('¿Cual es el segundo número? '), 10);
    let num3= parseInt(prompt('¿Cual es el tercer número? '), 10);

    if((num1>num2) &&(num1>num3)){
        alert(num1+ ' es el mayor de los 3');
    }
    else if((num2>num1) &&(num2>num3)){
        alert(num2+ ' es el mayor de los 3');
    }
    else if((num3>num2) &&(num3>num1)){
        alert(num3+ ' es el mayor de los 3');
    }
    document.write("FIN DE PROGRAMA");
}
function ejercicio4() {
    /* Hacer un programa mediante una función que permita introducir el nombre de usuario, el nombre del servidor y el dominio, y nos devuelva la dirección de correo electrónico. */
    
    let usuario = prompt('¿Cuál es tu usuario?');
    let servidor = prompt('¿Cuál es el servidor?');
    let dominio = prompt('¿Cuál es el dominio?');
    
    let direccionCorreo = usuario + "@" + servidor + "." + dominio;
    alert("Tu dirección de correo electrónico es: " + direccionCorreo);
   
    document.write("FIN DE PROGRAMA");
}
function ejercicio5(){
        /* Generar en pantalla un Array con los 25 primeros naturales y su factorial  */

    let array = [];
        let factorial = 1;
        for (let i = 1; i <= 25; i++) {
            array.push(i);
            factorial *= i;
        }
        document.write(array + "<br>" + factorial);
}
function ejercicio6(){
    /* Hacer  un  programa  mediante  una  función  que  permita  calcular  la  suma  de  dos  valores  que  se 
introducen por teclado. Visualizar el resultado en el cuerpo de la página Web. */

let num1 = parseInt(prompt('Introduce el primer número'));

let num2 = parseInt(prompt('Introduce el segundo número'));

let suma =num1+num2;

document.write('La suma de: ',num1, ' + ', num2, ' = ', suma);
}
function ejercicio7(){
    /* Hacer un programa que permita introducir un carácter y mediante una función compruebe si es un 
carácter  alfabético.  Realizar  depuración  de  dato,  para  garantizar  que  se  introduce  una  letra, 
visualizando un mensaje de alerta en caso contrario. */
let caracter = prompt('Introduce el caracter. ');
if (caracter.length=== 1 && /[a-zA-Z]/.test(caracter)){
    document.write("El caracter '"+ caracter+"' es una letra del alfabeto.");
} else {
    alert("Por favor introduce un caracter alfabético válido");
}

}
function ejercicio8(){
    /* Hacer un programa que permita introducir dos caracteres, con depuración de datos de entrada, y 
con una función permita comprobar cuál es el mayor de ellos. */
let caracter1 = prompt('Introduce el primer caracter. ');
let caracter2 = prompt('Introduce el segundo caracter.');
 if (caracter1.length===1 && /^[a-zA-Z]$/.test(caracter1) && caracter2.length===1 && /^[a-zA-Z]$/.test(caracter2)){
    if (caracter1>caracter2){
        document.write("El caracter mayor es: "+caracter1);
    } else if(caracter2>caracter1){
        document.write("El caracter mayor es: "+caracter2);
    } else {
        document.write("Ambos caracteres son iguales.");
    }

 }else{
    alert("Introduce dos caracteres alfabéticos válidos.");
 }

}
function ejercicio9(){
    /* Hacer un programa que mediante una función permita introducir un número y haga depuración de 
datos de entrada. */
let num = prompt("Introduce un número");
numero = Number(num);
if (!isNaN(numero)){
    document.write("El número ingresado es: "+num);
} else {
    alert("El caracter no es un número. ");
}

}
function ejercicio10(){
    /*Hacer  un  programa  que  mediante  una  función  permita  introducir  un  carácter  de  operación  y  lo 
depure. */
let caracter =prompt("Introduce un caracter de operación. ");

if(caracter==='+' || caracter==='-'|| caracter==='/'|| caracter==='*'){
    document.write("El caracter "+caracter+" es válido");
} else {
    alert("Introduce un caracter de operación(+,-,*,/)");
}
}
/*function ingresarOperacion() {
    let operacion = prompt("Introduce un carácter de operación (+, -, *, /):");
    let operacionesValidas = ['+', '-', '*', '/'];

    
    if (operacionesValidas.includes(operacion)) {
        document.write("La operación seleccionada es: " + operacion);
    } else {
        alert("Por favor, introduce una operación válida: +, -, * o /.");
    }
}
*/
function ejercicio11(){
    /*Hacer  un  programa  que,  mediante  una  función  e  introducidos  previamente  dos  números  y  un 
operador, realice el cálculo. */
    let num1= parseInt(prompt("Introduce el primer número: "));
    let num2= parseInt(prompt("Introduce el segundo número: "));
    let resultado;
    let operacion= prompt("Introduce la operación que quieras hacer(+,-,*,/)");

    switch (operacion) {
        case '+':
            resultado =num1+num2;
            break;
            case '-':
                resultado =num1-num2;
                break;
                case '*':
                    resultado =num1*num2;
                    break;
                    case '/':
                        if(num2!=0){
                        resultado =num1/num2;
                        }
                    else{
                    resultado="No se puede dividir por cero";
                    }
                        break;
    
        default:
            resultado= "Operacion no válida";
            break;
    }
    document.write(num1, operacion, num2, " = "+resultado);
}
function ejercicio12(){
    /*Realiza un ejercicio mediante funciones y trabajando con el objeto Date, que muestre por pantalla: 
La fecha actual 
La fecha del fin del mundo maya (21/11/2012) 
El número de días o el número de segundos que han pasado de esa fecha. */
    const fechaActual = new Date();
    document.write("La fecha de hoy: ", fechaActual, "<br>");
    const fechaMaya = new Date(2012, 11, 21);
    document.write("La fecha del fin del mundo maya: ", fechaMaya, "<br>");
    const diferenciaMilisengundos = fechaActual-fechaMaya;
    const diasPasados = diferenciaMilisengundos /(1000*60*60*24);
    document.write("Han pasado: ", Math.round(diasPasados), " dias. <br>");
    const segundosPasados = diferenciaMilisengundos/1000;
    document.write("Han pasado: ", Math.round(segundosPasados), " segundos. <br>");

}
/* function mostrarFechas() {
    // Paso 1: Obtener la fecha de hoy
    const fechaActual = new Date();  // Esto crea una nueva fecha con el día y hora actuales
    console.log("Fecha actual:", fechaActual);  // Muestra la fecha actual en la consola

    // Paso 2: Crear la fecha del "fin del mundo maya" (21 de diciembre de 2012)
    const fechaFinMundoMaya = new Date("2012-12-21");  // Esto crea una fecha específica
    console.log("Fecha del fin del mundo maya:", fechaFinMundoMaya);  // Muestra esa fecha en la consola

    // Paso 3: Calcular la diferencia en milisegundos entre la fecha actual y la del fin del mundo maya
    const diferenciaMilisegundos = fechaActual - fechaFinMundoMaya;  // Resta ambas fechas

    // Paso 4: Convertir la diferencia en días
    const diasPasados = diferenciaMilisegundos / (1000 * 60 * 60 * 24);  // Dividimos para obtener días
    console.log("Días pasados desde el fin del mundo maya:", Math.round(diasPasados));  // Muestra los días

    // Paso 5: Convertir la diferencia en segundos
    const segundosPasados = diferenciaMilisegundos / 1000;  // Dividimos para obtener segundos
    console.log("Segundos pasados desde el fin del mundo maya:", Math.round(segundosPasados));  // Muestra los segundos
}

// Llamar a la función para ver los resultados
mostrarFechas();
*/

function ejercicio13(){
    /*Crear una Clase con cuatro propiedades (Nombre de alumno y 3 notas). Ir almacenando los alumnos 
en un Array. 
      a) Permitir añadir y eliminar alumnos y notas. 
      b) Añadirle una nueva propiedad (nota media) mediante prototype 
      c) Mostrar el Array ordenado por nombres o por nota media */
      class alumno {
        constructor(nombre, nota1, nota2, nota3){
            this.nombre = nombre;
            this.nota1 = nota1;
            this.nota2 = nota2;
            this.nota3 = nota3;
        }
    }

    const alumnos = [];
    
    function agregarAlumno(nombre, nota1, nota2, nota3){
        const nuevoAlumno = new alumno(nombre, nota1, nota2, nota3);
        alumnos.push(nuevoAlumno);
        document.write(`<br><strong> ${nombre}</strong> agregado correctamente.<br>`);
    }

    function eliminarAlumno(nombre){
        const index = alumnos.findIndex(alumno => alumno.nombre === nombre);
        if(index !== -1){
            alumnos.splice(index, 1);
            document.write(`Alumno ${nombre} eliminado.<br>`);
        } else {
            document.write(`Alumno ${nombre} no encontrado.<br>`);
        }
    }

    alumno.prototype.notaMedia = function(){
        return (this.nota1 + this.nota2 + this.nota3) / 3;
    };

    function mostrarAlumnos(criterio = 'nombre'){
        if(criterio === 'nombre'){
            alumnos.sort((a,b) => a.nombre.localeCompare(b.nombre));
        } else if(criterio === 'notaMedia'){
            alumnos.sort((a, b) => b.notaMedia() - a.notaMedia());
        }

        alumnos.forEach(alumno => {
            document.write(`Nombre: ${alumno.nombre}, Nota Media: ${alumno.notaMedia().toFixed(2)}<br>`);
        });
    }

    agregarAlumno("Juan", 8, 7, 9);
    agregarAlumno("Pepe", 6, 5, 8);
    agregarAlumno("Lucas", 9, 9, 8);

    document.write("<br><strong>Alumnos ordenados por nombre: </strong><br>");
    mostrarAlumnos("nombre");

    document.write("<br><strong>Alumnos ordenados por nota media:</strong><br>");
    mostrarAlumnos("notaMedia");

    document.write("<br> <strong> Vamos a eliminar a Pepe: </strong></br>");
    eliminarAlumno("Pepe");

    document.write("<br><strong>Lista actualizada de alumnos por nombre:</strong><br>");
    mostrarAlumnos("nombre");
}
