import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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
    const navigateTo = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const dadosLogin = { email: username, senha: password };
            const responseData = await logar(dadosLogin);

            // Armazenar os dados de resposta no local storage
            localStorage.setItem('user', JSON.stringify(responseData));

            // Navegar para a página inicial
            navigateTo('/inicio');
        } catch (error) {
            console.error('Erro ao realizar login', error);
            alert('Erro ao realizar login. Verifique suas credenciais.');
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

                    <div className='recall-forget'>
                        <a href='#'>Recuperar senha</a>
                    </div>

                    <button type="submit">Entrar</button>

                    <div className='signup-link'>
                        <p className="cadastro">
                            Cadastrar novo usuário.<a href='#'>Criar conta</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
