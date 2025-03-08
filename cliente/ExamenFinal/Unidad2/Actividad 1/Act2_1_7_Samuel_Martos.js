/*
    Haz un programa para calcular la longitud de una circunferencia
    y el área del círculo
    correspondiente.
*/
function introducirDatos(){
let diametro = prompt("Itroduce el diametro: ");
let radio = prompt("Itroduce el radio: ");
    document.write("LONGITUD </br>");
    document.write(circunferenciaLongitud(diametro),"</br>");
    document.write("AREA </br>");
    document.write(circuloArea(radio));
}
function circunferenciaLongitud(diamentro) {
    let circunferencia=  diamentro*3.14;
    return circunferencia;
}
function circuloArea(radio){
//Area=pi *r2
    let area=3.14*radio^2;
    return area;
}