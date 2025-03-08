import { useState } from "react";
const EjemploEstado2= () => {
    const [estado, setEstado] = useState(
        {
            nombre: "Beetlejuice",
            datos: [],
        }
    );
    return (
        <>
            <header>
                <h1>{estado.nombre}</h1>
            </header>
            <button onClick={() => {
                setEstado({
                    ...estado,
                    nombre: "Bob"
                    });
            }}>Cambiar estado</button>
        </>
    );
}
export default EjemploEstado2;