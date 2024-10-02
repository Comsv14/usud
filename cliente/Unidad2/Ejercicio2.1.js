function Ejercicio2() {
    document.write("Hola mundo JS");
    }
    function Ejercicio2_2() {
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
        else(pro>=7){
            alert('Notable!!');
            
        }
    }