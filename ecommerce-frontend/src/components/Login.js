// src/components/Login.js

import React, { useState } from 'react';
import apiClient from '../api'; // Наш API клиент

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const loginData = { email, password };

        try {
            // Отправляем запрос на /api/auth/login
            const response = await apiClient.post('/auth/login', loginData);

            // Самый важный шаг: сохраняем токен!
            localStorage.setItem('token', response.data.token);

            setMessage('Вход выполнен успешно!');
            // Можно добавить перенаправление на главную страницу
            // window.location.href = '/'; 
        } catch (error) {
            setMessage('Ошибка: Неверный email или пароль.');
        }
    };

    return (
        <div>
            <h2>Вход в систему</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Войти</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;