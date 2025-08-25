// src/components/Register.js

import React, { useState } from 'react';
import apiClient from '../api'; // Импортируем наш клиент API

const Register = () => {
    // Состояния для хранения данных формы
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // Для сообщений об успехе или ошибке

    // Обработчик отправки формы
    const handleSubmit = async (event) => {
        event.preventDefault(); // Предотвращаем стандартное поведение формы
        setMessage('');

        const registrationData = {
            fullName: fullName,
            email: email,
            password: password,
        };

        try {
            // Отправляем POST-запрос на /api/auth/register
            const response = await apiClient.post('/auth/register', registrationData);
            setMessage('Регистрация прошла успешно!');
            // Очищаем поля формы
            setFullName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            // Обрабатываем ошибку
            if (error.response && error.response.data) {
                setMessage(`Ошибка: ${error.response.data}`);
            } else {
                setMessage('Произошла ошибка при регистрации.');
            }
        }
    };

    return (
        <div>
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Полное имя:</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit">Зарегистрироваться</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;