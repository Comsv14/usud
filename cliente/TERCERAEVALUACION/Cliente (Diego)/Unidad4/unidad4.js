const documentoContiene = (nodo, cadena) => {
    if (nodo.nodeType == Node.ELEMENT_NODE) {
    for (let i = 0; i < nodo.childNodes.length; i++) {
            if (documentoContiene(nodo.childNodes[i], cadena)) {
                return true;
            }            
        }
    return false;
   } else if (nodo.nodeType == Node.TEXT_NODE)
    return nodo.nodeValue.indexOf(cadena) > -1;
   };
   console.log(documentoContiene(document.body, "patrón de búsqueda"))
   