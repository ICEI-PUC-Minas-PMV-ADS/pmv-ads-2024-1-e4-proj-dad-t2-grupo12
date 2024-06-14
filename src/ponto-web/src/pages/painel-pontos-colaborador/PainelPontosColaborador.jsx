import './PainelPontosColaborador.css';
import MenuLateral from "../../components/menu-lateral/MenuLateral.jsx";
import PainelCentral from "../../components/painel-central/PainelCentral.jsx";
import Header from "../../components/header/Header.jsx";
import {useEffect} from "react";
import {getRegistrosPonto} from "../../services/api.jsx";
import {useParams} from "react-router-dom";

const PainelPontosColaborador = () => {
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getRegistrosPonto(id);
                console.log(result.data)
            } catch (error) {
                console.error('Erro ao buscar dados', error);
            }
        };

        fetchData();
    }, [id]);

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
                            <h2>Ponto e solicitações colaborador</h2>
                        </div>
                        <div className="name-top-table">
                            <div className="setor-name">
                                <span>Setor:</span>
                                <span>Comercial</span>
                            </div>
                            <div className="vertical-line"></div>
                            <div className="employee-name">
                                <span>RAMON RIDWAN</span>
                                <span>Vendedor</span>
                            </div>
                        </div>
                    </div>
                    <div className="main-painel-pontos">
                        <div className="painel-table-pontos">
                        <PainelCentral></PainelCentral>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PainelPontosColaborador;
