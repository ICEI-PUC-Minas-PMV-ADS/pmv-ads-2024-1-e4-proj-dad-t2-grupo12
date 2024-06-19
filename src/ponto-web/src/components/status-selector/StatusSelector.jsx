import PropTypes from "prop-types";
import "./StatusSelector.css";

const StatusButton = ({ status, onClick, selectedStatus }) => {
    const isSelected = status === selectedStatus;
    const statusColors = {
        Aprovado: "btn-success",
        Recusado: "btn-danger",
        Abono: "btn-secondary"
    };

    return (
        <button
            type="button"
            className={`btn ${isSelected ? statusColors[status] : 'btn-light'}`}
            onClick={() => onClick(status)}
        >
            {status}
        </button>
    );
};

const StatusSelector = ({ selectedStatus, setSelectedStatus }) => {

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };

    return (
        <div className="botoes-status">
            <StatusButton status="Aprovado" onClick={handleStatusChange} selectedStatus={selectedStatus} />
            <StatusButton status="Recusado" onClick={handleStatusChange} selectedStatus={selectedStatus} />
            <StatusButton status="Abono" onClick={handleStatusChange} selectedStatus={selectedStatus} />
        </div>
    );
};

StatusButton.propTypes = {
    status: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    selectedStatus: PropTypes.string
};

StatusSelector.propTypes = {
    selectedStatus: PropTypes.string,
    setSelectedStatus: PropTypes.func.isRequired
};

export default StatusSelector;
