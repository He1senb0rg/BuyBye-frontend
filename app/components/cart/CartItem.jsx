import React, { useState } from 'react';

const CartItem = ({ item, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [wishlisted, setWishlisted] = useState(false);

  const toggleWishlist = () => setWishlisted(!wishlisted);
  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="card mb-3 position-relative">
      <div className="row g-0 align-items-center">
        <div className="col-md-4">
          <img src={item.image} className="img-fluid rounded-start p-3" alt={item.name} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            {/* Top-right buttons container */}
            <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={toggleWishlist}
                aria-label="Toggle Wishlist"
              >
                <i className={`bi ${wishlisted ? 'bi-heart-fill text-danger' : 'bi-heart'}`} />
              </button>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => onRemove(item.id)}
                aria-label="Remover do Carrinho"
              >
                <i className="bi bi-x"></i>
              </button>
            </div>

            <h5 className="card-title mb-1">{item.name}</h5>

            <div className="d-flex align-items-center mb-2">
              <button className="btn btn-outline-secondary btn-sm me-2" onClick={decreaseQty}>-</button>
              <span>{quantity}</span>
              <button className="btn btn-outline-secondary btn-sm ms-2" onClick={increaseQty}>+</button>
            </div>

            <p className="card-text fw-bold">
              €{(item.price * quantity).toFixed(2)} <br />
              <span className="text-muted">€{item.price.toFixed(2)} cada</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;