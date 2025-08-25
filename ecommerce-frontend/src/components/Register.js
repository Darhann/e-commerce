import React, { useState } from 'react';
import apiClient from '../api';
import './Form.css'; // Импортируем стили для формы

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
            await apiClient.post('/auth/register', registrationData);
            setMessage('Регистрация прошла успешно!');
            // Очищаем поля формы
            setFullName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            // Обрабатываем ошибку
            const errorMessage = error.response?.data || 'Произошла ошибка при регистрации.';
            setMessage(`Ошибка: ${errorMessage}`);
        }
    };

    return (
        <div className="form-container">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Полное имя:</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit" className="form-button">Зарегистрироваться</button>
            </form>
            {message && <p className={`form-message ${message.startsWith('Ошибка') ? 'error' : ''}`}>{message}</p>}
        </div>
    );
};

export default Register;