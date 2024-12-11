let vuelos=[];
let vuelosMuyRentables=[];

class vuelo {
    constructor(codigo, nplazas, importe) {
        this.codigo = codigo;
        this.nplazas = nplazas;
        this.importe = importe;
    }
    
    toString() {
        return `Código:  ${this.codigo} || Número de Plazas:  ${this.nplazas} || Importe:  ${this.importe} euros. `;
    }
}
class vuelosRentables{
    constructor(codigo, ingresoE){
        this.codigo = codigo;
        this.ingresoE= ingresoE;
    }
    toString() {
        return `Código:  ${this.codigo} || Ingreso Estimado:  ${this.ingresoE} euros. `;
    }
}

function mostrarVuelos() {
    const lista = document.getElementById("listaVuelos");
    lista.innerHTML = "";
    vuelosMuyRentables.forEach(vuelosRentables => {
        const fila = document.createElement("li");
        fila.textContent = vuelosRentables.toString();
        lista.appendChild(fila);
    });
}

function agregarVuelo(){
            event.preventDefault();
            const codigo = document.getElementById("codigoV").value.trim();
            const nplazas = parseInt(document.getElementById("nplazas").value);
            const importe = parseFloat(document.getElementById("importe").value);

            if (buscarVuelo(codigo)) {
                alert("Ya existe una vuelo con ese codigo.");
                return;
            }
            vuelos.push(new vuelo(codigo, nplazas, importe));
            alert(`Vuelo añadido: ${codigo} Nº Plazas ${nplazas}`);
            const lista = document.getElementById("listaVuelos");
            
            if(importe>=20000){
                vuelosMuyRentables.push(new vuelosRentables(codigo, importe));
                mostrarVuelos();
            }
}
function buscarVuelo(codigoB) {
    return vuelos.some(vuelo => vuelo.codigo === codigoB);
}
function modificarVuelo(codigoI, nplazas, importe) {
    event.preventDefault();
    for (let i = 0; i < vuelos.length; i++) {
        if (vuelos[i].codigo === codigoI) {
            if (nplazas > 0 && importe > 0) {
                vuelos[i] = { codigoI, nplazas, importe };
                alert(`Vuelo modificado: ${codigoI}`);
                if(importe>=20000){
                    vuelosMuyRentables.push(new vuelosRentables(codigoI, importe));
                    mostrarVuelos();
                }
                return;
            } else {
                alert("Datos inválidos.");
                return;
            }
        }
    }
    alert("EL vuelo no fue encontrado.");
}
document.getElementById("modificar").addEventListener("click", () => {
    const codigoI = document.getElementById("codigoV").value;
    const nplazas = parseInt(document.getElementById("nplazas").value);
    const importe = parseFloat(document.getElementById("importe").value);
    modificarVuelo(codigoI, nplazas, importe); 
});
function calcularIngreso(nplazas, importe) {
    return (nplazas*importe).toFixed(2);
}
function mostrarCalcular() {
    event.preventDefault();
    if (vuelos.length > 0) {
        let resultado = "";
        let rentabilidad ="";
        for (let i = 0; i < vuelos.length; i++) {
            const vueloI = vuelos[i];
            const calculo = calcularIngreso(vueloI.nplazas, vueloI.importe);
            resultado += `Código: ${vueloI.codigo}: Ingresos = ${calculo} euros.`;

            if(calculo<10000){
                rentabilidad="Poco Rentable";
            }
            if(calculo>=10000 && calculo<=20000){
                rentabilidad="Rentable";
            }
            if(calculo>20000){
                rentabilidad="Muy rentable";
            }
        }
        alert(resultado + " "+ rentabilidad);
    } else {
        alert("No hay vuelos registradas.");
    }
}

document.getElementById("calcular").addEventListener("click", mostrarCalcular);


