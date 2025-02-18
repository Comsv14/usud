import './App.css';
import Encabezado from '../../nombre-del-proyecto/src/components/Encabezado';
import Pie from '../../nombre-del-proyecto/src/components/Pie';
import { AppContext, valoresDefecto } from '../../nombre-del-proyecto/src/AppContext';
function App() {
return (
<div className="App">
<AppContext.Provider value={valoresDefecto}>
<Encabezado />
<div>Esto simplemente es contenido.</div>
<Pie />
</AppContext.Provider>
</div>
);
}
export default App;
