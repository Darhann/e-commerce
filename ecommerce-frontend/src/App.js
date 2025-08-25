// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProductList from './components/ProductList'; // Импорт каталога
import Cart from './components/Cart';             // Импорт корзины

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Главная</Link></li>
                        <li><Link to="/products">Каталог</Link></li>
                        <li><Link to="/cart">Корзина</Link></li>
                        <li><Link to="/register">Регистрация</Link></li>
                        <li><Link to="/login">Вход</Link></li>
                    </ul>
                </nav>

                <hr />

                <Routes>
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<h2>Добро пожаловать в наш магазин!</h2>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;