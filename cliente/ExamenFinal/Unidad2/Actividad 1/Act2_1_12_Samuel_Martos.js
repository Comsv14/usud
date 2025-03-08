function cuadrado() {
    // Solicitar un número entero al usuario
    let n = prompt("Introduce un número entero:");
    // Generar el cuadrado de asteriscos
    for (let i = 0; i < n; i++) {
        for (let i = 0; i < n; i++) {
            document.write("*");
        }
        document.write("</br>");
    }
}