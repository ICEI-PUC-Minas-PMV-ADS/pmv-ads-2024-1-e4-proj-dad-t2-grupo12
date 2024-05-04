import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import PaginaInicial from "./pages/pagina-inicial/PaginaInicial.jsx";
import { Routes, Route } from "react-router-dom";
import PainelPontosColaborador from "./pages/painel-pontos-colaborador/PainelPontosColaborador.jsx";
import RegistroDiarioColaborador from "./pages/registro-diario-colaborador/RegistroDiarioColaborador.jsx";

function App() {
  return (
    <>
    <Routes>
        <Route path='/' element={<PaginaInicial />} />
        <Route path='painel-colaborador' element={<PainelPontosColaborador />} />
        <Route path='painel-colaborador/registro-dia' element={<RegistroDiarioColaborador />} />
    </Routes>
    </>
  )
}

export default App