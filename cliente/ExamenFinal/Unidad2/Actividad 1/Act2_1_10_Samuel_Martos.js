/*
    Realiza un ejercicio en el que 
    se le pida al usuario un valor numérico
    y mediante un bucle while
    haga una cuenta atrás mostrándola mediante una ventana.
*/
function cuentaAtras() {
    let numero=prompt("Inserta un numero: ");
    while(numero>0){
        document.write(numero,"</br>");
        numero--;
    }
}