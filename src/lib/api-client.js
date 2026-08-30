import axios from 'axios';

export function createApiClient(baseURL) {
    const client = axios.create({ baseURL });

    client.interceptors.response.use(
        (response) => {
            if (response.data && response.data.success === false) {
                return Promise.reject(new Error(response.data.error));
            }
            return response.data;
        },
        (error) => {
            if (error.response?.data?.error) {
                return Promise.reject(new Error(error.response.data.error));
            }
            return Promise.reject(error);
        }
    );

    return client;
}