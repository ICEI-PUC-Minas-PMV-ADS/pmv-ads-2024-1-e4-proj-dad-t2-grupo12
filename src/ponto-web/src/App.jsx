import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import PaginaInicial from "./pages/pagina-inicial/PaginaInicial.jsx";
import { Routes, Route } from "react-router-dom";
import PainelPontosColaborador from "./pages/painel-pontos-colaborador/PainelPontosColaborador.jsx";
import RegistroDiarioColaborador from "./pages/registro-diario-colaborador/RegistroDiarioColaborador.jsx";
import Login from "./pages/login/Login.jsx";
import CadastroUsuario from "./pages/cadastro-usuario/CadastroUsuario.jsx";
import PaginaPerfil from './pages/pagina-perfil/PaginaPerfil.jsx';
import BuscarColaborador from "./pages/buscar-colaborador/BuscarColaborador.jsx";

function App() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/inicio' element={<PaginaInicial />} />
        <Route path='painel-colaborador' element={<PainelPontosColaborador />} />
        <Route path='painel-colaborador/registro-dia' element={<RegistroDiarioColaborador />} />
        <Route path='/painel-colaborador/:id' element={<PainelPontosColaborador />} />
        <Route path='/buscar-colaborador' element={<BuscarColaborador />} />
        <Route path='cadastro-usuario' element={<CadastroUsuario />} />
        <Route path='perfil' element={<PaginaPerfil/>}/>
    </Routes>
    </>
  )
}

export default App
