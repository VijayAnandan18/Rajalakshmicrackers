import React from 'react';
import './UserCards.css';

const UserCards = ({ product = {} }) => {
  return (
    <div className="user-card">
      <div className="user-card-img">
        <img
          src={product.pic || 'https://via.placeholder.com/350'}
          alt={product.name || 'Default Name'}
        />
      </div>
      <div className="user-card-details">
        <h3>{product.name || 'Default Name'}</h3>
        <div className="user-card-price-container">
          <div>Cost Price: Rs {product.costPrice || 'N/A'}</div>
          <div>Sale Price: Rs {product.salePrice || 'N/A'}</div>
        </div>
        <div className="user-card-button-container">
          <button
            className="user-card-button user-card-button-half"
            onClick={() => console.log('Add to Cart clicked')}
          >
            Add to Cart
          </button>
          <button
            className="user-card-button user-card-button-half"
            onClick={() => console.log('Add to Wishlist clicked')}
          >
            Add to Wishlist
          </button>
        </div>
        <button
          className="user-card-button user-card-button-full"
          onClick={() => console.log('View Product clicked')}
        >
          Click to View Product
        </button>
      </div>
    </div>
  );
};

export default UserCards;
