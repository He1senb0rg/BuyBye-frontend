import React, { useState } from 'react';

const CartItem = ({ item, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [wishlisted, setWishlisted] = useState(false);

  const toggleWishlist = () => setWishlisted(!wishlisted);
  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="card mb-3 w-100">
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
      <div className="row g-0">
        <div className="col-md-3 d-flex align-items-center">
          <img src={item.image} className="img-fluid rounded-start p-2" alt={item.name} />
        </div>

        <div className="col-md-9">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              {/* Name column */}
              <div className="col">
                <h5 className="card-title">{item.name}</h5>
              </div>

            </div>

            {/* Quantity & Price Row */}
            <div className="row align-items-center py-5 px-2">
              {/* Quantity controls */}
              <div className="col-md-12 d-flex">
                <button className="btn btn-outline-secondary btn-sm me-2" onClick={decreaseQty}>-</button>
                <span>{quantity}</span>
                <button className="btn btn-outline-secondary btn-sm ms-2" onClick={increaseQty}>+</button>
              </div>

              {/* Price */}
              <div className="text fw-bold text-end">
                €{(item.price * quantity).toFixed(2)}
                <div className="text-muted text-end">
                €{item.price.toFixed(2)} cada
              </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;