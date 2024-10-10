function Ejercicio2() {
    /*Haz un programa que muestre en una ventana el mensaje “Hola mundo JS”
    */
    document.write("Hola mundo JS");
    }
    function Ejercicio2_2() {
         /*Ejercicio de clase de notas
    */
        let nombre;
        let nota;
        nombre=prompt('Escriba su nombre: ', '');
        nota=prompt('Escriba su nota: ','');
        if(nota>=5){
            alert(nombre + ' está aprobado con un '+nota);
        }
    }
    function Ejercicio2_3(){
        let num1, num2;
        num1=prompt('Introduce el primer numero: ', '');
        num2=prompt('Introduce el segundo numero: ', '');

        num1=parseInt(num1);
        num2=parseInt(num2);
        if(num1>num2){
        alert('el mayor es: '+num1);
        }
        else{
            alert('el mayor es: '+num2)
        }
    }

    function Ejercicio2_4(){
        let nota1, nota2, nota3;
        nota1=prompt('Introduce la primera nota: ', '');
        nota2=prompt('Introduce la segunda nota: ', '');
        nota3=prompt('Introduce la tercera nota: ', '');
       
        nota1=parseInt(nota1);
        nota2=parseInt(nota2);
        nota3=parseInt(nota3);
        let pro;
        pro=(nota1+nota2+nota3) /3;
        if(pro>=9){
            alert('Sobresaliente!!');
        }
        else(pro>=7);{
            alert('Notable!!');
            
        }
    }
    function Ejercicio2_5() {
        /*Haz un programa que nos pida un número, y nos muestre en una única pantalla, el doble, el triple
        y el cuádruple del número que habíamos introducido (cada uno en una línea).*/
        let num1="10", num2="0";
       
        res=num1/num2;
        
        alert('El resultado es: '+ res);
        //El resultado es infinito
        
    }
    function Ejercicio2_6() {
        /*Haz un programa que nos pregunte nuestro nombre, nuestra edad. El programa nos tiene que dar
como resultado los días que hemos vivido hasta el momento (suponiendo años de 365 días).
*/
    let nombre, edad; 
    nombre=prompt('Introduce tu nombre: ', "");
    edad=prompt('Introduce tu edad: ', "");

    alert(nombre + ' ha vivido '+edad*365 + ' dias.');  
    }

    function Ejercicio2_7() {
       /* Haz un programa que nos pida un número, y nos muestre en una única pantalla, el doble, el triple
y el cuádruple del número que habíamos introducido (cada uno en una línea)*/
        let num;
        num=prompt('Introduce un número: ');

        document.write('El doble es: ' +num*2, "</br>");
        document.write('El triple es: ' +num*3, "</br>");
        document.write('El cuádruple es: ' +num*4, "</br>");

        //en una sola linea document.write('El doble es: '+num*2, "</br>", 'El triple es: '+num*3, "</br>", 'El cuádruple es: '+num*4, "</br>");
        
    }
    function Ejercicio2_8 () {
        /*El siguiente programa tiene errores. Corrígelo para que funcione y explica qué hace.
        <html>
        <script>
        /* Programa 6.htm
        var a, b;
        a= prompt(“Escribe la base:”)
        b= prompt(“Escribe la altura:”)
        alert(“Area= “ +(a*b/2);
        </script>
        </html>

         */
        let a, b;
        a= prompt('Escribe la base:');
        b= prompt('Escribe la altura:');
        alert('Area= ' + (a*b/2));
        //area
        
    }