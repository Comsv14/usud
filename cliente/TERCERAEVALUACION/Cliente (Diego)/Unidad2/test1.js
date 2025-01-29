function testUnidad2(){
    let extLet = 1;
     var extVar = 1;
    if (true) { 
        let intLet = 10;
        var intVar = 10;
        console.log("Dentro del bloque");
        console.log("extLet:", extLet);
        console.log("extVar:", extVar);
        console.log("intLet:", intLet);
        console.log("intVar:", intVar);
    } 
        console.log("Fuera del bloque");
        console.log("extLet:", extLet);
        console.log("extVar:", extVar);
        console.log("intVar:", intVar);
        console.log("intLet:", intLet);

    //variable = condicion ? valorSiVerdadero : valorSiFalso;
    let cuantitativo = l==1 ? "Singular":"Plural";
    document.write("</br>");
    document.write(cuantitativo);
    
        const libs = ["React", "Vue", "Angular"]; 
        console.log(`Este curso trata de ${libs[0]}`);

        const l = libs.length;
        console.log(` ${l > 1 ? `Estas ${l} bibliotecas` : "Esta biblioteca"}: 
            ${libs.join(", ")}
        `);
}
function testUnidad2_1() {
    let num1,num2;
    num1=prompt('Introduce el primer numero: ','')
    num2=prompt('Introduce el segundo numero: ','')
    num1=parseInt(num1);
    num1=parseInt(num2);
    alert(num1);
    if (num1>num2){
        alert('el mayor es '+num1);
    }
    else{
        alert('el mayor es '+num2)
    }
}