// src/components/Cart.js

import React, { useState, useEffect } from 'react';
import apiClient from '../api';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                // Запрашиваем корзину текущего пользователя
                const response = await apiClient.get('/cart');
                setCartItems(response.data);
            } catch (error) {
                setMessage('Не удалось загрузить корзину. Возможно, вы не вошли в систему.');
            }
        };
        fetchCartItems();
    }, []);

    return (
        <div>
            <h2>Ваша корзина</h2>
            {message && <p>{message}</p>}
            {cartItems.length === 0 ? (
                <p>Корзина пуста.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            {item.product.name} - {item.quantity} шт. x {item.price} руб.
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;