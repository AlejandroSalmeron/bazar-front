// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Cambia la URL si es necesario

// Obtener productos
export const getProducts = async (search) => {
    const response = await axios.get(`${API_URL}/items?q=${search}`);
    return response.data;
};

// Obtener un producto por su ID
export const getProductById = async (id) => {
    const response = await axios.get(`${API_URL}/items/${id}`);
    return response.data;
};

// Obtener las compras registradas
export const getSales = async () => {
    const response = await axios.get(`${API_URL}/sales`);
    return response.data;
};

// Agregar una venta
export const addSale = async (saleData) => {
    const response = await axios.post(`${API_URL}/addSale`, saleData);
    return response.data;
};
