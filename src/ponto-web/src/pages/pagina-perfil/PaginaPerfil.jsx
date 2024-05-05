import './PaginaPerfil.css';
import MenuLateral from "../../components/menu-lateral/MenuLateral.jsx";
import Header from "../../components/header/Header.jsx";
import Perfil from '../../components/painel-perfil/Perfil.jsx';

const PaginaPerfil = () => {
    return (
        <div className="app">
            <Header></Header>
            <div className="container">
                <div className="menu-lateral">
                    <MenuLateral></MenuLateral>
                </div>
                <div className="conteudo-central">
                    <div className="main-painel-principal">
                        <div>
                            <Perfil></Perfil>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default PaginaPerfil;
