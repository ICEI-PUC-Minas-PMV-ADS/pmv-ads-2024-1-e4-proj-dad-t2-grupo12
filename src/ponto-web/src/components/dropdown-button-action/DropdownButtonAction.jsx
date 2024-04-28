import Dropdown from 'react-bootstrap/Dropdown';
import './DropdownButtonAction.css';
import PropTypes from "prop-types";

function DropdownButtonAction({ status }) {
    const renderizarItensDropdown = (status) => {
        switch (status) {
            case "Solicitação":
                return (
                    <>
                        <Dropdown.Item href="#/action-1" className="button-item">Visualizar registros do dia</Dropdown.Item>
                        <Dropdown.Item href="#/action-1" className="button-item">Visualizar solicitação</Dropdown.Item>
                    </>
                );
            case "Aprovado":
                return (
                    <>
                        <Dropdown.Item href="#/action-1" className="button-item">Visualizar registros do dia</Dropdown.Item>
                    </>
                );
            case "Incompleto":
                return (
                    <>
                        <Dropdown.Item href="#/action-1" className="button-item">Visualizar registros do dia</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" className="button-item">Solicitar revisão</Dropdown.Item>
                    </>
                );
            default:
                return (
                    <>
                        <Dropdown.Item href="#/action-1" className="button-item" >Visualizar registros do dia</Dropdown.Item>
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
    status: PropTypes.string.isRequired // Validação da propriedade 'status' como uma string obrigatória
};


export default DropdownButtonAction;
