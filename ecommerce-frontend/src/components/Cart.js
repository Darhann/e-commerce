import React, { useState, useEffect } from 'react';
import apiClient from '../api';
import './Cart.css'; // Импортируем стили для корзины

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [message, setMessage] = useState('');
    const [total, setTotal] = useState(0);

    const fetchCartItems = async () => {
        try {
            const response = await apiClient.get('/cart');
            setCartItems(response.data);
            // Считаем общую сумму
            const totalSum = response.data.reduce((sum, item) => sum + item.price * item.quantity, 0);
            setTotal(totalSum);
        } catch (error) {
            setMessage('Не удалось загрузить корзину. Возможно, вы не вошли в систему.');
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleCheckout = async () => {
        try {
            await apiClient.post('/orders/cart/checkout');
            setMessage('Заказ успешно оформлен!');
            setCartItems([]);
            setTotal(0);
        } catch (error) {
             setMessage('Не удалось оформить заказ. Корзина пуста?');
        }
    };

    return (
        <div className="cart-container">
            <h2>Ваша корзина</h2>
            {message && <p className="form-message">{message}</p>}
            {cartItems.length === 0 ? (
                <p>Корзина пуста.</p>
            ) : (
                <div>
                    <ul className="cart-list">
                        {cartItems.map(item => (
                            <li key={item.id} className="cart-item">
                                <span className="item-name">{item.product.name}</span>
                                <span className="item-details">{item.quantity} шт. x {item.price} руб.</span>
                                <span className="item-total">{item.quantity * item.price} руб.</span>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <h3>Итого: {total} руб.</h3>
                        <button onClick={handleCheckout} className="checkout-button">
                            Оформить заказ
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;