function tiempoDeVida() {
        let nombre= prompt("Introduce tu nombre: ");
        let num= prompt("Introduce tu edad: ");
        parseInt(num);

        tiempo=num*365;
        //Haz un programa que nos pregunte nuestro nombre, nuestra edad. El programa nos tiene que dar 
        //como resultado los días que hemos vivido hasta el momento (suponiendo años de 365 días).
        document.write(tiempo);
}
