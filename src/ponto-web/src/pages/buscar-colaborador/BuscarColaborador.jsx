import './BuscarColaborador.css';
import MenuLateral from "../../components/menu-lateral/MenuLateral.jsx";
import Header from "../../components/header/Header.jsx";
import BuscarInput from "../../components/buscar-input/BuscarInput.jsx";

const BuscarColaborador = () => {
    return (
        <div className="app">
            <Header />
            <div className="container">
                <div className="menu-lateral">
                    <MenuLateral />
                </div>
                <div className="conteudo-central">
                    <div className="top-table">
                        <div className="title-top-table">
                            <h2>Buscar Colaborador</h2>
                        </div>
                    </div>
                    <div className="main-painel-inicial-buscar">
                        <div className="painel-table-inicial-buscar">
                            <BuscarInput redirect />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuscarColaborador;
