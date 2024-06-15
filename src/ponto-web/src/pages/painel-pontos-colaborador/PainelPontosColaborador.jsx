import './PainelPontosColaborador.css';
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRegistrosPontoUsuario } from "../../services/api.jsx";
import MenuLateral from "../../components/menu-lateral/MenuLateral.jsx";
import PainelCentral from "../../components/painel-central/PainelCentral.jsx";
import Header from "../../components/header/Header.jsx";

const PainelPontosColaborador = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const colaborador = location.state?.colaborador;
    console.log()

    useEffect(() => {
        if (!colaborador) {
            navigate("/buscar-colaborador");
        } else {
            const fetchData = async () => {
                try {
                    const result = await getRegistrosPontoUsuario(colaborador.id);
                    setRegistros(result || []);
                } catch (error) {
                    console.error('Erro ao buscar dados', error);
                }
            };

            fetchData();
        }
    }, [colaborador, navigate]);

    const [registros, setRegistros] = useState([]);

    if (!colaborador) {
        return null;
    }

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
                            <h2>Ponto e solicitações colaborador</h2>
                        </div>
                        <div className="name-top-table">
                            <div className="setor-name">
                                <span>Setor:</span>
                                <span>{colaborador.setores[0].nome}</span>
                            </div>
                            <div className="vertical-line"></div>
                            <div className="employee-name">
                                <span>{(colaborador.nome).toUpperCase()}</span>
                                <span>{colaborador.setores[0].categoria}</span>
                            </div>
                        </div>
                    </div>
                    <div className="main-painel-pontos">
                        <div className="painel-table-pontos">
                            <PainelCentral registros={registros} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PainelPontosColaborador;
