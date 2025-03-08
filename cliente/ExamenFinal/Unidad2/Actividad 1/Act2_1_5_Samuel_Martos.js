/*
    Haz un programa que nos pida un número,
     y nos muestre en una única pantalla, el doble, el triple
    y el cuádruple del número que habíamos introducido (cada uno en una línea).
*/
function numero() {
   let n1 = prompt("Introduce un numero");
   let doble = n1*2;
   let triple = n1*3;
   let cuadruple = n1*4;
    document.write(doble+"</br>");
    document.write(triple+"</br>");
    document.write(cuadruple);
}
