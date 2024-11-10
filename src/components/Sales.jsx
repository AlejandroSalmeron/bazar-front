import React, { useEffect, useState } from 'react';
import { getSales } from '../services/api';
import './Sales.css';

const Sales = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSales = async () => {
            setLoading(true);
            const data = await getSales();
            console.log(data);
            setSales(data);
            setLoading(false);
        };
        fetchSales();
    }, []);

    return (
        <div className="sales-container">
            <h1>Ventas Registradas</h1>
            {loading ? <p>Cargando...</p> : (
                sales.map(sale => (
                    <div key={sale.id} className="sale-card">
                        <div className="sale-card-image">
                            <img src={sale.thumbnail} alt={sale.title} />
                        </div>
                        <div className="sale-card-details">
                            <p>Producto: {sale.title}</p>
                            <p>Cantidad: {sale.quantity}</p>
                            <p>Total: ${sale.total}</p>
                            <p>Fecha: {new Date(sale.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Sales;