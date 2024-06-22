import './PaginaInicial.css';
import logogrande from "/src/assets/logogrande.png";
import MenuLateral from "../../components/menu-lateral/MenuLateral.jsx";
import Header from "../../components/header/Header.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaginaInicial = () => {
    const [userData, setUserData] = useState(null);
    const navigateTo = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            setUserData(parsedUser);
        } else {
            navigateTo('/');
        }
    }, [navigateTo]);

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
                            <h2>Bem vindo, {userData && userData.nome}</h2>
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
};

export default PaginaInicial;
