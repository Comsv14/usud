function vernumeros() {
/*
    Hacer un programa que contenga una 
    función llamada vernumeros() 
    que permita visualizar los 10
    primeros números tantas veces como queramos
*/
let final = prompt('Cuantas vezes quieres ver los 10 primeros numeros?');
parseInt(final);
    for (let i=1; i<=final; i++){
        for (let i = 0; i <= 10; i++) {
                document.write(i," ");
        }
        document.write("<br>");
    }
}