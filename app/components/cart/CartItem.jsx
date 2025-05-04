import React, { useState } from 'react';

const CartItem = ({ item, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [wishlisted, setWishlisted] = useState(false);

  const toggleWishlist = () => setWishlisted(!wishlisted);
  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="card mb-3">
      <div className="row g-0 align-items-center">
        <div className="col-md-4">
          <img src={item.image} className="img-fluid rounded-start mx-3" alt={item.name} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <h5 className="card-title mb-1">{item.name}</h5>
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={toggleWishlist}
                aria-label="Toggle Wishlist"
              >
                <i className={`bi ${wishlisted ? 'bi-heart-fill text-danger' : 'bi-heart'}`} />
              </button>
            </div>
            <p className="card-text text-muted mb-2">{item.description}</p>
            <div className="d-flex align-items-center mb-2">
              <button className="btn btn-outline-secondary btn-sm me-2" onClick={decreaseQty}>-</button>
              <span>{quantity}</span>
              <button className="btn btn-outline-secondary btn-sm ms-2" onClick={increaseQty}>+</button>
            </div>
            <p className="card-text fw-bold">
              €{(item.price * quantity).toFixed(2)} <br />
              <span className="text-muted">€{item.price.toFixed(2)} cada</span>
            </p>
            <button
              className="btn btn-sm btn-outline-danger mt-2"
              onClick={() => onRemove(item.id)}
            >
              Remover do Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;