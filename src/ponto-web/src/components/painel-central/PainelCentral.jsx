import './PainelCentral.css';
import DropdownButtonAction from "../dropdown-button-action/DropdownButtonAction.jsx";
import {Badge, Table} from "react-bootstrap";

function PainelCentral() {

    const renderizarStatus = (status) => {
        switch (status) {
            case "Solicitação":
                return (
                    <Badge pill bg="warning" text="dark">
                        Solicitação
                    </Badge>
                );
            case "Aprovado":
                return (
                    <Badge pill bg="success">
                        Aprovado
                    </Badge>
                );
            case "Incompleto":
                return (
                    <Badge pill bg="danger">
                        Incompleto
                    </Badge>
                );
            default:
                return (
                    <Badge pill bg="success">
                        Aprovado
                    </Badge>
                );
        }
    };

    return (
        <div className="table-div">
            <Table bordered hover>
                <thead>
                <tr className="tr-cabecalho-primeira-linha">
                    <th className="linha-data">Data</th>
                    <th>Horas trabalhadas</th>
                    <th>Saldo diário</th>
                    <th>Saldo final</th>
                    <th>Status</th>
                    <th>Ação</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="linha-data">Sex, 12/04/2024</td>
                    <td>08:00:00</td>
                    <td>00:00:00</td>
                    <td>03:00:00</td>
                    <td>{renderizarStatus("Solicitação")}</td>
                    <td><DropdownButtonAction status="Solicitação"/></td>
                </tr>
                <tr>
                    <td className="linha-data">Quin, 11/04/2024</td>
                    <td>04:50:00</td>
                    <td>-03:10:00</td>
                    <td>03:00:00</td>
                    <td>{renderizarStatus("Incompleto")}</td>
                    <td><DropdownButtonAction status="Incompleto"/></td>
                </tr>
                <tr>
                    <td className="linha-data">Qua, 10/04/2024</td>
                    <td>08:00:00</td>
                    <td>00:00:00</td>
                    <td>03:00:00</td>
                    <td>{renderizarStatus("Aprovado")}</td>
                    <td><DropdownButtonAction status="Aprovado"/></td>
                </tr>
                <tr>
                    <td className="linha-data">Ter, 09/04/2024</td>
                    <td>08:00:00</td>
                    <td>00:00:00</td>
                    <td>03:00:00</td>
                    <td>{renderizarStatus("Aprovado")}</td>
                    <td><DropdownButtonAction status="Aprovado"/></td>
                </tr>
                <tr>
                    <td className="linha-data">Seg, 05/04/2024</td>
                    <td>08:30:00</td>
                    <td>00:30:00</td>
                    <td>03:00:00</td>
                    <td>{renderizarStatus("Aprovado")}</td>
                    <td><DropdownButtonAction status="Aprovado"/></td>
                </tr>
                <tr>
                    <td className="linha-data">Dom, 04/04/2024</td>
                    <td>-</td>
                    <td>00:00:00</td>
                    <td>02:30:00</td>
                    <td>{renderizarStatus("Aprovado")}</td>
                    <td><DropdownButtonAction status="Aprovado"/></td>
                </tr>
                <tr>
                    <td className="linha-data">Sab, 03/04/2024</td>
                    <td>-</td>
                    <td>00:00:00</td>
                    <td>02:30:00</td>
                    <td>{renderizarStatus("Aprovado")}</td>
                    <td><DropdownButtonAction status="Aprovado"/></td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default PainelCentral;
