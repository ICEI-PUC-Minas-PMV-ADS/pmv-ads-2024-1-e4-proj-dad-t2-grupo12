import axios from 'axios';

const Api = axios.create({
    baseURL: "https://nova-api-controller.onrender.com"
})

export const getRegistrosPonto = async () => {
    try {
        const response = await Api.get('/v1/public/registroponto/');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
};


export default Api;
