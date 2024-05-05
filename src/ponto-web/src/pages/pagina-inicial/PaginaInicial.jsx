import './PaginaInicial.css';
import logogrande from "/src/assets/logogrande.png";
import MenuLateral from "../../components/menu-lateral/MenuLateral.jsx";
import Header from "../../components/header/Header.jsx";
import logotransparente from "../../assets/logotransparente.png";

const PaginaInicial = () => {
    return (
        <div className="app">
            <Header></Header>
            <div className="container">
                <div className="menu-lateral">
                    <MenuLateral></MenuLateral>
                </div>
                <div className="conteudo-central">
                    <div className="top-table">
                        <div className="title-top-table">
                            <h2>Bem vindo, usuário logado</h2>
                        </div>
                    </div>
                    <div className="main-painel-inicial">
                        <div className="painel-table-inicial">
                            <img src={logogrande} alt="logofundo" className="imagem-painel" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default PaginaInicial;
