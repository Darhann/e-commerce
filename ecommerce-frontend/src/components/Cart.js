import React, { useState, useEffect } from 'react';
import apiClient from '../api';
import './Cart.css'; // Импортируем стили для корзины

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [message, setMessage] = useState('');
    const [total, setTotal] = useState(0);

    // Функция для загрузки корзины с сервера
    const fetchCartItems = async () => {
        try {
            // Запрашиваем корзину текущего пользователя
            const response = await apiClient.get('/orders/cart'); // Используем правильный эндпоинт
            
            const items = response.data.items || []; // Получаем массив товаров из объекта корзины
            setCartItems(items);

            // Считаем общую сумму
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

    // useEffect будет вызван один раз при загрузке компонента
    useEffect(() => {
        fetchCartItems();
    }, []); // Пустой массив зависимостей означает "выполнить один раз"

    const handleCheckout = async () => {
        try {
            await apiClient.post('/orders/cart/checkout');
            setMessage('Заказ успешно оформлен!');
            setCartItems([]); // Очищаем корзину на фронтенде
            setTotal(0);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Не удалось оформить заказ. Возможно, корзина пуста.';
            setMessage(errorMessage);
        }
    };
    
    // Новая функция для удаления товара
    const handleDeleteItem = async (itemId) => {
        try {
            // Отправляем запрос на удаление
            await apiClient.delete(`/cart/items/${itemId}`);
            // Обновляем список товаров в корзине, чтобы удаленный элемент сразу исчез
            fetchCartItems(); 
        } catch (error) {
            setMessage('Не удалось удалить товар.');
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
                                {/* Добавляем кнопку удаления */}
                                <button onClick={() => handleDeleteItem(item.id)} className="delete-button">
                                    Удалить
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <h3>Итого: {total.toFixed(2)} руб.</h3>
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