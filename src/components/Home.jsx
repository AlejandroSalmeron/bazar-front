// src/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (search.trim()) {
            navigate(`/items?search=${search}`);
        }
    };

    return (
        <div className="home-container">
            <h1>Bienvenido a la tienda</h1>
            <input
                type="text"
                className="input-box"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar productos"
            />
            <button onClick={handleSearch}>Buscar</button>
        </div>
    );
};

export default Home;