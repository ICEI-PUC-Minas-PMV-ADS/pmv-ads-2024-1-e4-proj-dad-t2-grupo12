import './PaginaPerfil.css';
import MenuLateral from "../../components/menu-lateral/MenuLateral.jsx";
import Header from "../../components/header/Header.jsx";
import Perfil from '../../components/painel-perfil/Perfil.jsx';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const PaginaPerfil = () => {
    const navigateTo = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigateTo('/');
        }
    }, [navigateTo]);

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
