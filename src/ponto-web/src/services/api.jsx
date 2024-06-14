import axios from 'axios';

const api = axios.create({
    baseURL: "https://nova-api-controller.onrender.com"
});

export const getRegistrosPonto = async () => {
    try {
        const response = await api.get('/v1/public/registroponto/listar');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
};

export const logar = async (dadosLogin) => {
    try {
        const response = await api.post('/v1/public/login/', dadosLogin);
        return response.data;
    } catch (error) {
        console.error('Erro ao logar', error);
        throw error;
    }
};

export const listarColaboradores = async () => {
    try {
        const response = await api.get('/v1/public/usuario/');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
};

export const obterColaboradorPeloNome = async (nome) => {
    try {
        const response = await api.get('/v1/public/usuario/' + nome);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
};
