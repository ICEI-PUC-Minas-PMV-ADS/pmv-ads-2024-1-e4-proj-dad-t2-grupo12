import Dropdown from 'react-bootstrap/Dropdown';
import './MenuLateral.css';
import {useLocation, useNavigate} from "react-router-dom";

function MenuLateral() {
    const navigateTo = useNavigate()

    const handleNavigateTo = (path) => {
        navigateTo(`/${path}`);
    };

    return (
        <Dropdown.Menu show>
            <Dropdown.Item eventKey="1" onClick={() => handleNavigateTo(`inicio`)}>Página inicial</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => handleNavigateTo(`painel-colaborador`)}>Solicitações </Dropdown.Item>
            <Dropdown.Item eventKey="3" onClick={() => handleNavigateTo(`cadastro-usuario`)}>Cadastrar colaborador</Dropdown.Item>
            <Dropdown.Item eventKey="4" onClick={() => handleNavigateTo('perfil')}>Perfil</Dropdown.Item>
        </Dropdown.Menu>
    );
}

export default MenuLateral;
