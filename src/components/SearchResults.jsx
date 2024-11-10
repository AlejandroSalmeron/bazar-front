import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import './SearchResult.css';

const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchParams = new URLSearchParams(useLocation().search);
    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const data = await getProducts(searchQuery);
            console.log(data);
            setProducts(data);
            setLoading(false);
        };
        fetchProducts();
    }, [searchQuery]);

    return (
        <div className="results-container">
            <h2>Resultados para: {searchQuery}</h2>
            {loading ? <p>Cargando...</p> : (
                <div className="results">
                    <p>{products.length} resultados encontrados</p>
                    <div className="cards-container">
                        {products.map(product => {
                            const integerPart = Math.floor(product.rating);
                            const decimalPart = product.rating - integerPart;
                            const roundedRating = decimalPart >= 0.5 ? Math.ceil(product.rating) : Math.floor(product.rating);

                            return (
                                <div key={product.id} className="card">
                                    <Link to={`/item/${product.id}`} className="card-link">
                                        <div className="card-image">
                                            <img src={product.thumbnail} alt={product.title} />
                                        </div>
                                        <div className="card-info">
                                            <h3 className="card-title">{product.title}</h3>
                                            <p className="card-category">Smartphone</p>
                                            <p className="card-description">{product.description}</p>
                                            <p className="card-price">${product.price}</p>
                                            <div className="card-rating">
                                                {/* Renderizamos la cantidad de estrellas en función del rating */}
                                                {Array.from({ length: 5 }, (_, index) => (
                                                    <span
                                                        key={index}
                                                        className={index < roundedRating ? "star filled" : "star empty"}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
