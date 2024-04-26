import React from 'react';
import './PainelPontosColaborador.css';
import MenuLateral from "../../components/menu-lateral/MenuLateral.jsx";
import PainelCentral from "../../components/painel-central/PainelCentral.jsx";

const PainelPontosColaborador = () => {
    return (
        <div className="app">
            <header className="header">
                <div>
                    <img src="src/assets/logotransparente.png" alt="Logo" width="50" height="50" />
                </div>

            </header>
            <div className="container">
                {/* Menu lateral */}
                <div className="menu-lateral">
                   <MenuLateral></MenuLateral>
                </div>
                {/* Painel principal */}
                <div className="main-panel">
                    <PainelCentral></PainelCentral>
                </div>
            </div>
        </div>
    );
}

export default PainelPontosColaborador;
