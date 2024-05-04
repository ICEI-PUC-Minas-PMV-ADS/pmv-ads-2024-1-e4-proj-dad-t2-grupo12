import './RegistroDiarioColaborador.css';
import MenuLateral from "../../components/menu-lateral/MenuLateral.jsx";
import Timeline from "../../components/timeline/Timeline.jsx";
import Header from "../../components/header/Header.jsx";
import StatusSelector from "../../components/status-selector/StatusSelector.jsx";
import {useNavigate} from "react-router-dom";

const RegistroDiarioColaborador = () => {
    const navigateTo = useNavigate()

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
                    <div className="main-painel">
                        <div className="central-card">
                            <div className="timeline-div">
                                <span className="timeline-titulo">Registro de horários do dia:</span>
                                <Timeline></Timeline>
                            </div>
                            <div className="vertical-line-painel"></div>
                            <div className="div-central">
                                <div className="motivo-div">
                                    <span className="motivo-titulo">Motivo da solicitação:</span>
                                    <div className="card-motivo">
                                        <span className="motivo-texto">Esqueci de registrar a volta do almoço</span>
                                    </div>
                                </div>
                                <div className="saldo-informacao">
                                    <div className="saldo-item">
                                        <span className="saldo-label">Saldo diário:</span>
                                        <span className="saldo-valor">+02h 20m</span>
                                    </div>
                                    <div className="saldo-item">
                                        <span className="saldo-label">Saldo diário:</span>
                                        <span className="saldo-valor">+02h 20m</span>
                                    </div>
                                </div>
                            </div>
                            <div className="vertical-line-painel"></div>
                            <div className="botoes-div">
                                <div className="botoes-titulo">
                                    <span className="motivo-titulo">Alterar Status:</span>
                                </div>
                                <div className="botoes-select-status botoes-container">
                                    <StatusSelector></StatusSelector>
                                </div>
                            </div>
                            <div className="options-button">
                                <button type="button" onClick={() => navigateTo(-1)} className="btn btn-warning btn-cancel">Cancelar</button>
                                <button type="button" onClick={() => navigateTo(-1)} className="btn btn-warning btn-save">Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default RegistroDiarioColaborador;
