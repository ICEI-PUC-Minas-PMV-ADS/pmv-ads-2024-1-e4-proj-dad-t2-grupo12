import Dropdown from 'react-bootstrap/Dropdown';
import './MenuLateral.css';

function MenuLateral() {
    return (
        <Dropdown.Menu show>
            <Dropdown.Item eventKey="2">Página inicial</Dropdown.Item>
            <Dropdown.Item eventKey="3">Solicitações</Dropdown.Item>
            <Dropdown.Item eventKey="4">Cadastrar/Editar colaborador</Dropdown.Item>
            <Dropdown.Item eventKey="4">Perfil</Dropdown.Item>
        </Dropdown.Menu>
    );
}

export default MenuLateral;
