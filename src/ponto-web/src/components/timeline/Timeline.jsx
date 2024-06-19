import './Timeline.css';
import PropTypes from "prop-types";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";

const formatTime = (dateTime) => {
    if (!dateTime) return '';
    const date = new Date(dateTime);
    date.setHours(date.getHours() + 3);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

const Timeline = ({ registro, solicitacaoAlteracao }) => {
    const navigateTo = useNavigate();

    useEffect(() => {
        if (solicitacaoAlteracao) {
            const fetchData = async () => {
                if (solicitacaoAlteracao.tipoPeriodo === 'InicioExpediente') {
                    registro.inicioExpediente = solicitacaoAlteracao.novaData;
                } else if (solicitacaoAlteracao.tipoPeriodo === 'InicioIntervalo') {
                    registro.inicioIntervalo = solicitacaoAlteracao.novaData;
                } else if (solicitacaoAlteracao.tipoPeriodo === 'FimIntervalo') {
                    registro.fimIntervalo = solicitacaoAlteracao.novaData;
                } else {
                    registro.fimExpediente = solicitacaoAlteracao.novaData;
                }
            };

            fetchData();
        }
    }, [solicitacaoAlteracao]);

    const events = [
        registro.inicioExpediente && {
            title: formatTime(registro.inicioExpediente),
            typeTitle: "InicioExpediente",
            type: "entrada"
        },
        registro.inicioIntervalo && {
            title: formatTime(registro.inicioIntervalo),
            typeTitle: "InicioIntervalo",
            type: !registro.inicioExpediente ? "entrada" : "saida"
        },
        registro.fimIntervalo && {
            title: formatTime(registro.fimIntervalo),
            typeTitle: "FimIntervalo",
            type: !registro.inicioIntervalo ? "entrada" : "saida"
        },
        registro.fimExpediente && {
            title: formatTime(registro.fimExpediente),
            typeTitle: "FimExpediente",
            type: !registro.fimIntervalo ? "entrada" : "saida"
        }
    ].filter(event => event);

    return (
        <div className="principal">
            <div className="timeline">
                {events.map((event, index) => (
                    <div className="timeline-item" key={index}>
                        <div className="timeline-content-inicial">
                            <div className="timeline-content-dot">
                                <div className={`timeline-dot ${event.type}`}></div>
                            </div>
                            {solicitacaoAlteracao && (
                                <div className={`timeline-content ${event.typeTitle === solicitacaoAlteracao.tipoPeriodo ? 'timeline-content-highlight' : ''}`}>
                                    <h3>{event.title}</h3>
                                </div>
                            )}
                        </div>
                        <div className="timeline-content-date">
                            <span className="timeline-date">{event.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

Timeline.propTypes = {
    registro: PropTypes.shape({
        id: PropTypes.string.isRequired,
        inicioExpediente: PropTypes.string,
        inicioIntervalo: PropTypes.string,
        fimIntervalo: PropTypes.string,
        fimExpediente: PropTypes.string
    }).isRequired,
    solicitacaoAlteracao: PropTypes.shape({
        id: PropTypes.string.isRequired,
        motivo: PropTypes.string,
        novaData: PropTypes.string,
        dataSolicitacao: PropTypes.string,
        tipoPeriodo: PropTypes.string,
        aprovado: PropTypes.bool,
        status: PropTypes.string,
        usuarioId: PropTypes.string,
        pontoId: PropTypes.string
    }),
};

export default Timeline;
