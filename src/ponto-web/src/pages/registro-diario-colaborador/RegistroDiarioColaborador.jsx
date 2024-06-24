import './RegistroDiarioColaborador.css';
import MenuLateral from "../../components/menu-lateral/MenuLateral.jsx";
import Timeline from "../../components/timeline/Timeline.jsx";
import Header from "../../components/header/Header.jsx";
import StatusSelector from "../../components/status-selector/StatusSelector.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {editarEAprovarSolicitacao, editarRegistroPonto, obterSolicitacaoAlteracao} from "../../services/Api.jsx";

const RegistroDiarioColaborador = () => {
    const navigateTo = useNavigate();
    const location = useLocation();
    const colaborador = location.state?.colaborador;
    const registro = location.state?.registro;
    const [solicitacaoAlteracao, setSolicitacaoAlteracao] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const user = localStorage.getItem('user');
            if (!user || (registro == null || registro.id == null)) {
                navigateTo('/');
            }

            if (!colaborador || !registro) {
                navigateTo('/buscar-colaborador');
            } else {
                try {
                    const result = await obterSolicitacaoAlteracao(registro.id);
                    setSolicitacaoAlteracao(result);
                } catch (error) {
                    console.error('Erro ao buscar dados', error);
                }
            }
        };

        fetchData();
    }, [colaborador, navigateTo, registro.id]);

    if (!colaborador) {
        return null;
    }

    const formatTime = (dateTime) => {
        if (!dateTime) return '';
        const date = new Date(dateTime);
        date.setHours(date.getHours() + 3);
        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    const renderizarTipoSolicitacao = (tipoSolicitacao) => {
        switch (tipoSolicitacao) {
            case "InicioExpediente":
                return (
                    <>
                        <span className="saldo-valor">Início expediente</span>
                    </>
                );
            case "InicioIntervalo":
                return (
                    <>
                        <span className="saldo-valor">Início Intervalo</span>
                    </>
                );
            case "FimIntervalo":
                return (
                    <>
                        <span className="saldo-valor">Fim Intervalo</span>
                    </>
                );
            case "FimExpediente":
                return (
                    <>
                        <span className="saldo-valor">Fim Expediente</span>
                    </>
                );
            default:
                return (
                    <>
                        <span className="saldo-valor">Intervalo</span>
                    </>
                );
        }
    };

    const renderizarDataASerAlterada = (solicitacaoAlteracao) => {
        return formatTime(solicitacaoAlteracao.novaData)
    };

    const handleSave = async () => {
        solicitacaoAlteracao.novaData = solicitacaoAlteracao.novaData.replace('Z', '')
        solicitacaoAlteracao.novaData = solicitacaoAlteracao.novaData + '.000Z'

        if (selectedStatus === 'Aprovado') {
            if (solicitacaoAlteracao.tipoPeriodo === 'InicioExpediente') {
                registro.inicioExpediente = solicitacaoAlteracao.novaData;
            } else if (solicitacaoAlteracao.tipoPeriodo === 'InicioIntervalo') {
                registro.inicioIntervalo = solicitacaoAlteracao.novaData;
            } else if (solicitacaoAlteracao.tipoPeriodo === 'FimIntervalo') {
                registro.fimIntervalo = solicitacaoAlteracao.novaData;
            } else {
                registro.fimExpediente = solicitacaoAlteracao.novaData;
            }
            registro.temSolicitacaoAlteracao = false;


            try {
                const respostaPonto = await editarRegistroPonto(registro.id, registro);

                if (respostaPonto) {
                    solicitacaoAlteracao.aprovado = true;
                    solicitacaoAlteracao.status = "aprovado"
                    const result = await editarEAprovarSolicitacao(solicitacaoAlteracao.id, solicitacaoAlteracao);
                    setSolicitacaoAlteracao(result);
                }

            } catch (error) {
                console.error('Erro ao buscar dados', error);
            }
        }

        navigateTo(-1)
    };

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
                                <span>{colaborador.setores[0].nome}</span>
                            </div>
                            <div className="vertical-line"></div>
                            <div className="employee-name">
                                <span>{(colaborador.nome).toUpperCase()}</span>
                                <span>{colaborador.setores[0].categoria}</span>
                            </div>
                        </div>
                    </div>
                    <div className="main-painel">
                        <div className="central-card">
                            <div className="timeline-div">
                                <span className="timeline-titulo">Registro de horários do dia:</span>
                                <Timeline registro={registro} solicitacaoAlteracao={solicitacaoAlteracao} />
                            </div>
                            <div className="vertical-line-painel"></div>
                            <div className="div-central">
                                <div className="motivo-div">
                                    <span className="motivo-titulo">Motivo da solicitação:</span>
                                    <div className="card-motivo">
                                        <span className="motivo-texto">{solicitacaoAlteracao?.motivo}</span>
                                    </div>
                                </div>
                                <div className="saldo-informacao">
                                    <div className="saldo-item">
                                        <span className="saldo-label">Registro a alterar:</span>
                                        <span className="saldo-valor">{solicitacaoAlteracao && renderizarTipoSolicitacao(solicitacaoAlteracao.tipoPeriodo)}</span>
                                    </div>
                                    <div className="saldo-item">
                                        <span className="saldo-label">Hora a ser modificada:</span>
                                        <span className="saldo-valor">{solicitacaoAlteracao && renderizarDataASerAlterada(solicitacaoAlteracao)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="vertical-line-painel"></div>
                            <div className="botoes-div">
                                <div className="botoes-titulo">
                                    <span className="motivo-titulo">Alterar Status:</span>
                                </div>
                                <div className="botoes-select-status botoes-container">
                                    <StatusSelector selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
                                </div>
                            </div>
                            <div className="options-button">
                                <button type="button" onClick={() => navigateTo(-1)} className="btn btn-warning btn-cancel">Cancelar</button>
                                <button type="button" onClick={handleSave} className="btn btn-warning btn-save">Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistroDiarioColaborador;
