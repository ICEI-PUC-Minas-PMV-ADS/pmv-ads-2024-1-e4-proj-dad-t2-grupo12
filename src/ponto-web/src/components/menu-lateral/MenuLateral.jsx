import Dropdown from 'react-bootstrap/Dropdown';
import './MenuLateral.css';
import { useNavigate} from "react-router-dom";

function MenuLateral() {
    const navigateTo = useNavigate()

    return (
        <Dropdown.Menu show>
            <Dropdown.Item eventKey="2" onClick={() => navigateTo(`/`)}>Página inicial</Dropdown.Item>
            <Dropdown.Item eventKey="3" onClick={() => navigateTo(`painel-colaborador`)}>Solicitações </Dropdown.Item>
            <Dropdown.Item eventKey="4">Cadastrar/Editar colaborador</Dropdown.Item>
            <Dropdown.Item eventKey="4">Perfil</Dropdown.Item>
        </Dropdown.Menu>
    );
}

export default MenuLateral;
