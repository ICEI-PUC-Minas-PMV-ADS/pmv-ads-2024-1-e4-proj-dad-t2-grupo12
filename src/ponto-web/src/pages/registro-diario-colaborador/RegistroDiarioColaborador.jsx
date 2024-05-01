import './RegistroDiarioColaborador.css';
import MenuLateral from "../../components/menu-lateral/MenuLateral.jsx";
import {Button, InputGroup, Form, Image, Col} from "react-bootstrap";
import Timeline from "../../components/timeline/Timeline.jsx";
import Header from "../../components/header/Header.jsx";

const RegistroDiarioColaborador = () => {
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
                    <div className="main-panel">
                        <div className="central-card">
                            <div className="timeline-div">
                                <span className="timeline-titulo">Registro de horários do dia:</span>
                                <Timeline></Timeline>
                            </div>
                            <div className="vertical-line-painel"></div>
                            <div className="motivo-div">
                                <span className="motivo-titulo">Motivo da solitação:</span>
                                <div className="card-motivo">
                                    <span className="motivo-texto">Esqueci de registrar a volta do almoço</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistroDiarioColaborador;
