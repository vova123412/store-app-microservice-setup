import React from 'react';

const Product = ({ id, name, price }) => {
    return (
        <div className="product">
            <h2>{name}</h2>
            <p>ID: {id}</p>
            <p>Price: ${price}</p>
        </div>
    );
};

export default Product;