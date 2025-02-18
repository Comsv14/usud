import './App.css';
import Encabezado from './components/Encabezado';
import Pie from './components/Pie';
import { AppContext, valoresDefecto } from './AppContext';
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
