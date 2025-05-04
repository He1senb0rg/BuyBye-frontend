import React, { useState } from 'react';

const CartItem = ({ item, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [wishlisted, setWishlisted] = useState(false);

  const toggleWishlist = () => setWishlisted(!wishlisted);
  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
  <div className="card mb-3 w-100 position-relative">
    {/* Wishlist + Remove buttons */}
    <div className="d-inline-flex gap-2 position-absolute top-0 end-0 mx-2 my-2">
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

    {/* Flex layout instead of grid */}
    <div className="d-flex flex-row">
      {/* Image on the left, stays left always */}
      <div className="p-2" style={{ flex: '0 0 120px' }}>
        <img
          src={item.image}
          className="img-fluid rounded-start"
          alt={item.name}
          style={{ maxWidth: '100px', height: 'auto' }}
        />
      </div>

      {/* Info on the right */}
      <div className="flex-grow-1 p-3">
        <h5 className="card-title">{item.name}</h5>

        <div className="d-flex align-items-center mb-2">
          <button className="btn btn-outline-secondary btn-sm me-2" onClick={decreaseQty}>-</button>
          <span>{quantity}</span>
          <button className="btn btn-outline-secondary btn-sm ms-2" onClick={increaseQty}>+</button>
        </div>

        <p className="card-text fw-bold mb-0">
          €{(item.price * quantity).toFixed(2)}
        </p>
        <div className="text-muted">€{item.price.toFixed(2)} cada</div>
      </div>
    </div>
  </div>
  );
};

export default CartItem;