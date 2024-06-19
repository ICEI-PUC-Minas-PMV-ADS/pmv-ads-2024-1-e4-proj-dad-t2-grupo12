import axios from 'axios';

const Api = axios.create({
    baseURL: "https://nova-api-controller.onrender.com"
})

export const getRegistrosPonto = async () => {
    try {
        const response = await Api.get('/v1/public/registroponto/listar');
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

export const updateRegistroPonto = async (id, registro) => {
    const response = await Api.put('/v1/public/registroponto/' + id, registro);
    return response.data;
}

export const editarSenha = async (senha) => {
    try {
        const response = await Api.put('/v1/public/usuario/alterarSenha', senha, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2NjU4YzQ1MGQ4MTEwYjVkN2ViM2Q2ZjMiLCJuYmYiOjE3MTczNzMwNzcsImV4cCI6MTcxNzQ1OTQ3NywiaWF0IjoxNzE3MzczMDc3fQ.s2e4Xnr8qOkcW4q54MASQb5oAtXkpzZ-YSG7SnWQEJ0w'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
};

export const obterUsuario = async () => {
    try {
        const response = await Api.get('/v1/public/usuario/', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2NjU4YzQ1MGQ4MTEwYjVkN2ViM2Q2ZjMiLCJuYmYiOjE3MTczNzMwNzcsImV4cCI6MTcxNzQ1OTQ3NywiaWF0IjoxNzE3MzczMDc3fQ.s2e4Xnr8qOkcW4q54MASQb5oAtXkpzZ-YSG7SnWQEJ0'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
};




export default Api;
