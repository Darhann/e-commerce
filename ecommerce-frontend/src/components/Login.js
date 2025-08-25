import React, { useState } from 'react';
import apiClient from '../api';
import './Form.css'; // Импортируем те же стили для формы

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const loginData = { email, password };

        try {
            const response = await apiClient.post('/auth/login', loginData);
            localStorage.setItem('token', response.data.token);
            setMessage('Вход выполнен успешно!');
            
            // Перенаправляем пользователя в каталог товаров после успешного входа
            window.location.href = '/products';
        } catch (error) {
            setMessage('Ошибка: Неверный email или пароль.');
        }
    };

    return (
        <div className="form-container">
            <h2>Вход в систему</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="form-button">Войти</button>
            </form>
            {message && <p className={`form-message ${message.startsWith('Ошибка') ? 'error' : ''}`}>{message}</p>}
        </div>
    );
};

export default Login;