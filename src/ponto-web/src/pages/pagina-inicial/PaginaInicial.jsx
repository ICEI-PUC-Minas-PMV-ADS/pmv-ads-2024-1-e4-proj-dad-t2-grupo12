import './PaginaInicial.css';
import logogrande from "/src/assets/logogrande.png.png";
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
                    <div className="top-table">
                        <div className="title-top-table">
                            <h2>Bem vindo, usuário logado</h2>
                        </div>
                    </div>
                    <div className="main-painel-inicial">
                        <div className="painel-table-inicial">
                            <img src={logogrande} alt="Descrição da imagem" className="imagem-painel" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default PaginaInicial;
