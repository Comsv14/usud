/*
Haz un programa que funcione de la manera siguiente:
• Nos pida nuestro nombre.
• Nos pida nuestro primer apellido.
• Nos pida en que población vivimos.
• Al final nos presente:
=======================
Hola “nombre y apellido”
Adiós habitante de “Población” 
======================
*/
function name() {
    let nombre=prompt("Introduce tu nombre: ");
    let apellido=prompt("Introduce tu primer apellido: ");
    let poblacion=prompt("Introduce la poblacion: ");

    document.write("=======================</br>")
    document.write("Hola ",nombre," ",apellido,"</br>")
    document.write("Adiós habitante de ",poblacion,"</br>")
    document.write("=======================")
}