import axios from 'axios';

const Api = axios.create({
    baseURL: "https://nova-api-controller.onrender.com",
    // baseURL: "http://localhost:8080"
})

export const getRegistrosPonto = async (userId) => {
    try {
        const response = await Api.get('/v1/public/registroponto/usuario/' + userId);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
};

export const saveRegistroPonto = async (registro) => {
    const response = await Api.post('/v1/public/registroponto/', registro);
    return response.data;
}

export const editarRegistroPonto = async (id, registro) => {
    const response = await Api.put('/v1/public/registroponto/' + id, registro);
    return response.data;
}

export const editarSenha = async (senha, token) => {
    try {
        const response = await Api.put('/v1/public/usuario/alterarSenha', senha, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
};

export const obterUsuario = async (token) => {
    try {
        const response = await Api.get('/v1/public/usuario/', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
};

export const registrarSolicitacaoAlteracao = async (solicitacao) => {
    try {
        const response = await Api.post('/v1/public/solicitacao/', solicitacao);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
};


export const login = async (email, password) => {
    const response = await Api.post('/v1/public/login/', { email, password });
    return response.data;
};


export default Api;
