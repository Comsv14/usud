      function prueba1() { 
        let valor = prompt("Introduce la contraseña", ""); 
        if (valor == "HOLA123") { 
          alert("La contraseña es correcta"); 
        } else {
            //contraseña incorrecta 
           prueba1(); 
        } 
      }


      

      /*
      Una interesante cuestión relativa a la ejecución de funciones es que también es posible 
      averiguar desde dónde se está invocando una determinada función. Esta facilidad la 
      proporciona la propiedad caller de las funciones. Se accede a ella de la misma manera que 
      a arguments, y contiene una referencia a la función que ha llamado a la actual.
      */

    function PruebaCaller() { 
        if (PruebaCaller.caller == null) { 
            alert("Me estás llamando desde el sitio correcto"); 
        } 
        else { 
            alert("Desde ahí no me puedes llamar"); 
        } 
    } 
    PruebaCaller(); 
    function fPrueba() { 
        PruebaCaller(); 
    } 
    fPrueba();