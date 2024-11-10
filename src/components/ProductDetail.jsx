import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, addSale } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProductById(id);
            setProduct(data);
        };
        fetchProduct();
    }, [id]);

    const handlePurchase = async () => {
        const saleData = {
            product_id: product.id,
            quantity: 1,
            price: product.price,
            total: product.price,
        };
        await addSale(saleData);
        navigate(`/sales`);
    };

    if (!product) return <p>Cargando...</p>;

    // Redondeo del rating
    const integerPart = Math.floor(product.rating);
    const decimalPart = product.rating - integerPart;
    const roundedRating = decimalPart >= 0.5 ? Math.ceil(product.rating) : Math.floor(product.rating);

    return (
        <div className="product-detail-container">
            <h1>{product.title}</h1>

            {/* Mostrar las imágenes del producto */}
            <div className="product-images">
                {product.images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`${product.title} - imagen ${index + 1}`}
                        className="product-image"
                    />
                ))}
            </div>

            <p className="product-description">{product.description}</p>
            <p className="product-price">Precio: ${product.price}</p>
            <p className="product-stock">Stock: {product.stock}</p>
            <p className="product-category">Categoría: {product.category}</p>

            {/* Calificación de estrellas */}
            <div className="product-rating">
                {Array.from({ length: 5 }, (_, index) => (
                    <span
                        key={index}
                        className={index < roundedRating ? "star filled" : "star empty"}
                    >
                        ★
                    </span>
                ))}
            </div>

            {/* Botón de compra */}
            <button onClick={handlePurchase} className="buy-button">Comprar</button>
        </div>
    );
};

export default ProductDetail;
