//mismo que el anterior pero con un for
function cuentaAtras() {
    let numero=prompt("Inserta un numero: ");
    //numero=parseInt(numero);
    for(;numero>0;numero--){
        document.write(numero,"</br>");
    }
}