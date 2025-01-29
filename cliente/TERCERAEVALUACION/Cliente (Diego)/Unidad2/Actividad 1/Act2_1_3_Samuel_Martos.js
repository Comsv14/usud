function dividirExcepcion() {
   try {
        let num1= prompt("Introduce el primer numero para dividir: ");
        let num2= prompt("Introduce el segundo numero para dividir: ");
          parseInt=num1;
          parseInt=num2;
        //¿Qué sucede si en lugar de dividir dos números,
        //¿Y si no introducimos nada?
          if((num1.trim() || num2.trim()) == "") {
               throw new Error ("empty");
          }
          /* que sucede si el divisor es el numero 0 */
          // Verificar si el divisor es 0
          if (num2 == 0) {
               throw new Error("Error: No se puede dividir por 0.");
          }    
            // intentamos dividir dos textos?
          if(isNaN(num1) || isNaN(num2)) {
               throw new Error("not a number");
          }
        let division=num1/num2;
        document.write(division);
   } catch (error) {
        alert(error.message)
   }
}