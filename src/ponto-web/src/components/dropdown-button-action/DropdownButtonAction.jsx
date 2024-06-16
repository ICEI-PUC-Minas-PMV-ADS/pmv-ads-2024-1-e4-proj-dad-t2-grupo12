import Dropdown from 'react-bootstrap/Dropdown';
import './DropdownButtonAction.css';
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

function DropdownButtonAction({ status, registro, colaborador }) {
    const navigateTo = useNavigate()

    const handleVisualizarRegistrosClick = () => {
        navigateTo(`/registro-dia`, { state: { registro, colaborador } });
    };

    const renderizarItensDropdown = (status) => {
        switch (status) {
            case "Solicitação":
                return (
                    <>
                        <Dropdown.Item className="button-item">Visualizar registros do dia</Dropdown.Item>
                        <Dropdown.Item className="button-item" onClick={handleVisualizarRegistrosClick}>Visualizar solicitação</Dropdown.Item>
                    </>
                );
            case "Aprovado":
                return (
                    <>
                        <Dropdown.Item className="button-item">Visualizar registros do dia</Dropdown.Item>
                    </>
                );
            default:
                return (
                    <>
                        <Dropdown.Item >Visualizar registros do dia</Dropdown.Item>
                    </>
                );
        }
    };

    return (
        <Dropdown>
            <Dropdown.Toggle>
                Ação
            </Dropdown.Toggle>

            <Dropdown.Menu className="button-menu">
                {renderizarItensDropdown(status)}
            </Dropdown.Menu>
        </Dropdown>
    );
}

DropdownButtonAction.propTypes = {
    status: PropTypes.string.isRequired,
    colaborador: PropTypes.object.isRequired,
    registro: PropTypes.object.isRequired
};


export default DropdownButtonAction;
