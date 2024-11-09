/*Crear una Clase con cuatro propiedades (Nombre de alumno y 3 notas). Ir almacenando los alumnos 
en un Array. 
      a) Permitir añadir y eliminar alumnos y notas. 
      b) Añadirle una nueva propiedad (nota media) mediante prototype 
      c) Mostrar el Array ordenado por nombres o por nota media */
      
      class Alumno {
        constructor(nombre, nota1, nota2, nota3){
            this.nombre = nombre;
            this.nota1 = nota1;
            this.nota2 = nota2;
            this.nota3 = nota3;
        }
    }
    //Array para los alumnos
    const alumnos = [];

    //funcion para aniadir alumno, agregas los atributos del objeto y creas un const de nuevo alumbno que pushea el array para almacenar alumnos con el nuevo con sus valores
    function agregarAlumno(nombre, nota1, nota2, nota3){
        const nuevoAlumno = new Alumno(nombre, nota1, nota2, nota3);
        alumnos.push(nuevoAlumno);
    }

    function eliminarAlumno(nombre){
        const index = alumnos.findIndex(alumno => alumno.nombre === nombre);
        if (index !== -1){
            alumnos.splice(index, 1);
            console.log(`Alumno ${nombre} eliminado.`);
        } else {
            console.log(`Alumno ${nombre} no encontrado`);
        }
    }

    Alumno.prototype.notaMedia = function(){
        return (this.nota1 + this.nota2 + this.nota3) /3;
    };

    function mostrarAlumnos(criterio = 'nombre') {
        if (criterio === 'nombre') {
            // Ordenar por nombre alfabéticamente
            alumnos.sort((a, b) => a.nombre.localeCompare(b.nombre));
        } else if (criterio === 'notaMedia') {
            // Ordenar por nota media de mayor a menor
            alumnos.sort((a, b) => b.notaMedia() - a.notaMedia());
        }
        alumnos.forEach(alumno=>{
            console.log(`Nombre: ${alumno.nombre}, Nota Media: ${alumno.notaMedia().toFixed(2)}`);
    });
        agregarAlumno("Juan", 8, 7, 9);
        agregarAlumno("Ana", 6, 5, 8);
        agregarAlumno("Pedro", 9, 9, 8);

        // Mostrar alumnos ordenados por nombre
        console.log("Alumnos ordenados por nombre:");
        mostrarAlumnos("nombre");

        // Mostrar alumnos ordenados por nota media
        console.log("\nAlumnos ordenados por nota media:");
        mostrarAlumnos("notaMedia");

        // Eliminar un alumno
        eliminarAlumno("Ana");

        // Mostrar lista actualizada de alumnos
        console.log("\nLista actualizada de alumnos:");
        mostrarAlumnos("nombre");

            }

