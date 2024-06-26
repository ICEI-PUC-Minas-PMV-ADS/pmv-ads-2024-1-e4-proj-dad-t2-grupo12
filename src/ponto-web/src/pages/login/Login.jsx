import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import GenericModal from '../../components/generic-modal/GenericModal.jsx';

const api = axios.create({
    baseURL: "https://nova-api-controller.onrender.com"
});

const logar = async (dadosLogin) => {
    try {
        const response = await api.post('/v1/public/login/admin', dadosLogin);
        return response.data;
    } catch (error) {
        console.error('Erro ao logar', error);
        throw error;
    }
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigateTo = useNavigate();

    const handleCloseErrorModal = () => setShowErrorModal(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const dadosLogin = { email: username, password: password };
            const responseData = await logar(dadosLogin);

            if (responseData.jwtToken != null) {
                localStorage.setItem('user', JSON.stringify(responseData));
                navigateTo('/inicio');
            } else {
                setErrorMessage(responseData.mensagem);
                setShowErrorModal(true);
            }
        } catch (error) {
            console.error('Erro ao realizar login', error);
            setErrorMessage('Erro ao realizar login. Verifique suas credenciais.');
            setShowErrorModal(true);
        }
    };

    return (
        <div className="app-login">
            <div className="conteiner">
                <form onSubmit={handleSubmit}>
                    <h1>Acesso ao sistema</h1>
                    <div className='input-field'>
                        <input type="email" placeholder='E-mail' required
                               onChange={(e) => setUsername(e.target.value)} />
                        <FaUser className='icon' />
                    </div>
                    <div className='input-field'>
                        <input type="password" placeholder='Senha' required
                               onChange={(e) => setPassword(e.target.value)} />
                        <FaLock className='icon' />
                    </div>

                    <button type="submit">Entrar</button>

                </form>
            </div>
            <GenericModal
                show={showErrorModal}
                handleClose={handleCloseErrorModal}
                title="Erro ao realizar login"
                message={errorMessage}
                closeText="Fechar"
            />
        </div>
    );
};

export default Login;
