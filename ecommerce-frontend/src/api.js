// src/api.js

import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Это "перехватчик" (interceptor). Он будет срабатывать ПЕРЕД каждым запросом.
apiClient.interceptors.request.use(
    (config) => {
        // 1. Берем токен из localStorage
        const token = localStorage.getItem('token');
        // 2. Если токен есть, добавляем его в заголовок Authorization
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;