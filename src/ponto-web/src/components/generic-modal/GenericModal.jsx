import { Modal, Button } from 'react-bootstrap';
import './GenericModal.css'
import PropTypes from "prop-types";

const GenericModal = ({ show, handleClose, title, message, handleConfirm, confirmText, closeText }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {closeText || 'Fechar'}
                </Button>
                {handleConfirm && (
                    <Button variant="primary" onClick={handleConfirm}>
                        {confirmText || 'Confirmar'}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

GenericModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    handleConfirm: PropTypes.func,
    confirmText: PropTypes.string,
    closeText: PropTypes.string,
};

export default GenericModal;
