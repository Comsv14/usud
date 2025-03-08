import React from 'react';
import ReactDOM from 'react-dom/client';

const jsxElement = <h1>This is a JSX element</h1>;
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(jsxElement);

function insertarTabla() {
    const filaElement=
    <table> 
        <th>
            <td>
                Holita
            </td>
        </th>
    </table>;
    const tablaElement = document.getElementById('tabla');
    const insertfila=ReactDOM.createRoot(tablaElement);
    insertfila.render(filaElement);
};



const botonin=document.getElementById("bot");
botonin.addEventListener("click", function() {
    //COMPROBAR SI EXISTE
    insertarTabla();
    //borrar el boton
    botonin.remove();
});

//MIDU
const appDomElement = document.getElementById('app');

const rootApp = ReactDOM.createRoot(appDomElement);
const button = React.createElement('button',{"data-id":123}, 'Boton 1');
const button2 = React.createElement('button',{"data-id":456}, 'Boton 2');
const button3 = React.createElement('button',{"data-id":789}, 'Boton 3');
const div = React.createElement('div', null, [button,button2,button3]);
rootApp.render(div);

//MIDU FIN