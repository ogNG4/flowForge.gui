import axios, { AxiosRequestConfig } from 'axios';
import auth from './auth';

const apiUrl = import.meta.env.BASE_URL;

export default {
    url: import.meta.env.MODE === 'development' ? '/api' : apiUrl,
    getAuthHeader() {
        const token = auth.getToken();

        if (!token) {
            return undefined;
        }

        return { Authorization: `Bearer ${token}` };
    },
    getClient(options?: AxiosRequestConfig) {
        return axios.create({
            baseURL: this.url,
            headers: {
                ...options?.headers,
                ...this.getAuthHeader(),
            },
            ...options,
        });
    },
};
