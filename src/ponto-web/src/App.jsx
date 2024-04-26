import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import PainelPontosColaborador from "./pages/painel-pontos-colaborador/PainelPontosColaborador.jsx";
import PainelCentral from "./components/painel-central/PainelCentral.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <PainelPontosColaborador></PainelPontosColaborador>
      </div>
    </>
  )
}

export default App
