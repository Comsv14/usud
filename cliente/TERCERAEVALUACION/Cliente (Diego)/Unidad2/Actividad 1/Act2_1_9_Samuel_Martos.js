/*
Teniendo la variable primer_saludo = “hola”
Y la variable segundo_saludo = primer_saludo
Si ahora, le asignásemos un nuevo valor a primer_saludo =”hello”
¿Qué valor tendría segundo_saludo?
*/
function saludo(){
    let primer_saludo = "hola";
    let segundo_saludo = primer_saludo;
    
    primer_saludo = "hello";
    document.write(segundo_saludo);
    //tendria "hola" porque no se actualiza
}