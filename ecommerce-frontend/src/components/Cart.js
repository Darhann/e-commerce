import React, { useState, useEffect } from 'react';
import apiClient from '../api';
import './Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [message, setMessage] = useState('');
    const [total, setTotal] = useState(0);

    const fetchCartItems = async () => {
        try {
            // ПРАВИЛЬНЫЙ ЗАПРОС: GET /api/orders/cart
            const response = await apiClient.get('/orders/cart'); 

            const items = response.data.items || []; // Получаем массив товаров из объекта корзины
            setCartItems(items);

            const totalSum = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            setTotal(totalSum);

        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage('Для доступа к корзине необходимо войти в систему.');
            } else {
                setMessage('Не удалось загрузить корзину.');
            }
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
             const errorMessage = error.response?.data || 'Не удалось оформить заказ. Возможно, корзина пуста.';
             setMessage(errorMessage);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await apiClient.delete(`/cart/items/${itemId}`); // Используем новый URL из OrderItemController
            fetchCartItems(); 
        } catch (error) {
            setMessage('Не удалось удалить товар.');
        }
    };

    console.log(handleCheckout())

    return (
        <div className="cart-container">
            <h2>Ваша корзина</h2>
            {message && <p className="form-message">{message}</p>}
            {cartItems.length === 0 && !message.includes('необходимо войти') ? (
                <p>Корзина пуста.</p>
            ) : (
                <div>
                    <ul className="cart-list">
                        {cartItems.map(item => (
                            <li key={item.id} className="cart-item">
                                <span className="item-name">{item.product.name}</span>
                                <span className="item-details">{item.quantity} шт. x {item.price} руб.</span>
                                <span className="item-total">{(item.quantity * item.price).toFixed(2)} руб.</span>
                                <button onClick={() => handleDeleteItem(item.id)} className="delete-button">
                                    Удалить
                                </button>
                            </li>
                        ))}
                    </ul>
                    {cartItems.length > 0 && (
                        <div className="cart-summary">
                            <h3>Итого: {total.toFixed(2)} руб.</h3>
                            <button onClick={handleCheckout} className="checkout-button">
                                Оформить заказ
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Cart;