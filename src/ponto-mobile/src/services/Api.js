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

// export const outroEndpoint = async () => {
//     try {
//         const response = await Api.get('/outro/endpoint/', {
//             headers: {
//                 'Authorization': `Bearer seu_token_aqui`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Erro ao buscar dados da API:', error);
//         throw error;
//     }
// };

export default Api;
