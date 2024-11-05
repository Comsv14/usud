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


