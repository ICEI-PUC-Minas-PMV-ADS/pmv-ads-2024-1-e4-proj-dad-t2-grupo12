import axios from 'axios';

const api = axios.create({
    baseURL: "https://nova-api-controller.onrender.com"
});

export const getRegistrosPontoUsuario = async (id) => {
    try {
        const response = await api.get('/v1/public/registroponto/usuario/' + id);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
};

export const obterSolicitacaoAlteracao = async (idRegistro) => {
    try {
        const response = await api.get('/v1/public/solicitacao/registro/' + idRegistro);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
};

export const editarEAprovarSolicitacao = async (idSolicitacao, solicitacaoBory) => {
    try {
        const response = await api.put('/v1/public/solicitacao/' + idSolicitacao, solicitacaoBory);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
};

export const editarRegistroPonto = async (idRegistro, registroBory) => {
    try {
        const response = await api.put('/v1/public/registroponto/' + idRegistro, registroBory);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
};

export const logar = async (dadosLogin) => {
    try {
        const response = await api.post('/v1/public/login/admin', dadosLogin);
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

export const editarDadosColaborador = async (idRegistro, registroBory) => {
    try {
        const response = await api.put('/v1/public/usuario/admin/' + idRegistro, registroBory);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
};
