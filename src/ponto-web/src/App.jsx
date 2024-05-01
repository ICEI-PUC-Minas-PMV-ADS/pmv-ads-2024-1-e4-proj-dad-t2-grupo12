import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import RegistroDiarioColaborador from "./pages/registro-diario-colaborador/RegistroDiarioColaborador.jsx";
import PainelPontosColaborador from "./pages/painel-pontos-colaborador/PainelPontosColaborador.jsx";

function App() {

  return (
    <>
      <div>
          <RegistroDiarioColaborador></RegistroDiarioColaborador>
          {/*<PainelPontosColaborador></PainelPontosColaborador>*/}
      </div>
    </>
  )
}

export default App
