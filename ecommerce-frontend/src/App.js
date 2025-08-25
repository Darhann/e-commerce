// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.href = '/login'; // Перенаправляем на страницу входа
    };

    return (
        <Router>
            <div>
                <nav className="app-nav">
                    <ul className="nav-list">
                        <li><Link to="/" className="nav-link">Главная</Link></li>
                        <li><Link to="/products" className="nav-link">Каталог</Link></li>
                        {isLoggedIn && <li><Link to="/cart" className="nav-link">Корзина</Link></li>}

                        {/* Условный рендеринг кнопок */}
                        {!isLoggedIn ? (
                            <>
                                <li><Link to="/register" className="nav-link">Регистрация</Link></li>
                                <li><Link to="/login" className="nav-link">Вход</Link></li>
                            </>
                        ) : (
                            <li>
                                <button onClick={handleLogout} className="nav-button-logout">
                                    Выход
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>

                <main className="container">
                    <Routes>
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<h2>Добро пожаловать в наш магазин!</h2>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;