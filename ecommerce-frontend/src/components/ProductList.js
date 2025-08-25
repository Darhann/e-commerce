import React, { useState, useEffect } from 'react';
import apiClient from '../api';
import './Product.css'; // Импортируем стили для товаров

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');

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
    }, []);

    const handleAddToCart = async (productId) => {
        const cartItem = {
            product: { id: productId },
            quantity: 1,
        };

        try {
            await apiClient.post('/cart', cartItem);
            setMessage(`Товар добавлен в корзину!`);
            // Убираем сообщение через 3 секунды
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Ошибка: сначала войдите в систему.');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <div>
            <h2>Каталог товаров</h2>
            {message && <p className="form-message">{message}</p>}
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <h4>{product.name}</h4>
                        <p>{product.description}</p>
                        <p className="price">{product.price} руб.</p>
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