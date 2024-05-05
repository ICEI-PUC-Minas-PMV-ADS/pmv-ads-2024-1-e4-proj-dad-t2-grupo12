import './PaginaInicial.css';
import MenuLateral from "../../components/menu-lateral/MenuLateral.jsx";
import Header from "../../components/header/Header.jsx";

const PaginaInicial = () => {
    return (
        <div className="app">
            <Header></Header>
            <div className="container">
                <div className="menu-lateral">
                    <MenuLateral></MenuLateral>
                </div>
                <div className="conteudo-central">
                    <div className="main-painel-principal">
                        <div className="painel-table-principal">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaginaInicial;
