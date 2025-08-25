// src/components/ProductList.js

import React, { useState, useEffect } from 'react';
import apiClient from '../api';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');

    // useEffect будет вызван один раз при загрузке компонента
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiClient.get('/products');
                setProducts(response.data);
            } catch (error) {
                setMessage('Не удалось загрузить товары.');
            }
        };
        fetchProducts();
    }, []); // Пустой массив зависимостей означает "выполнить один раз"

    const handleAddToCart = async (productId) => {
        // Для добавления в корзину нам нужен ID продукта и количество
        const cartItem = {
            product: { id: productId },
            quantity: 1, // По умолчанию добавляем 1 товар
        };

        try {
            // Используем наш "умный" apiClient, который сам подставит токен
            await apiClient.post('/cart', cartItem);
            setMessage(`Товар ${productId} добавлен в корзину!`);
        } catch (error) {
            setMessage('Ошибка: сначала войдите в систему.');
        }
    };

    return (
        <div>
            <h2>Каталог товаров</h2>
            {message && <p>{message}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map((product) => (
                    <div key={product.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
                        <h4>{product.name}</h4>
                        <p>{product.description}</p>
                        <p>Цена: {product.price} руб.</p>
                        <p>В наличии: {product.stock} шт.</p>
                        <button onClick={() => handleAddToCart(product.id)}>
                            Добавить в корзину
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;