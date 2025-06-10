import React, { useState } from 'react';
import { updateCartItem, removeFromCart } from '../../services/api';

const CartItem = ({ item, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const getDiscountedPrice = (product) => {
  const price = Number(product.price) || 0;
  const discount = Number(product.discount);
  if (discount && discount > 0 && discount < 100) {
    return price * (1 - discount / 100);
  }
  return price;
};

const pricePerUnit = getDiscountedPrice(item.product);

  const handleQuantityChange = async (newQty) => {
    if (newQty < 1) return;
    setLoading(true);
    try {
      await updateCartItem(item.product._id, {
        quantity: newQty,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      });
      onUpdate();
    } catch (err) {
      console.error('Erro ao atualizar quantidade:', err);
    }
    setLoading(false);
  };

  const handleRemove = async () => {
    setLoading(true);
    try {
      await removeFromCart(item.product._id);
      onUpdate();
    } catch (err) {
      console.error('Erro ao remover item:', err);
    }
    setLoading(false);
  };

  return (
    <div className="card mb-3 w-100 position-relative">
      <div className="position-absolute top-0 end-0 p-2">
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleRemove}
          disabled={loading}
        >
          <i className="bi bi-x"></i>
        </button>
      </div>

      <div className="d-flex flex-row">
        <div className="p-2" style={{ flex: '0 0 120px' }}>
          <img
            src={item.product.image}
            className="img-fluid rounded-start"
            alt={item.product.name}
            style={{ maxWidth: '100px', height: 'auto' }}
          />
        </div>
        <div className="flex-grow-1 p-3">
          <h5>{item.product.name}</h5>
          <div className="d-flex align-items-center mb-2">
            <button
              className="btn btn-outline-secondary btn-sm me-2"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={loading || item.quantity <= 1}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className="btn btn-outline-secondary btn-sm ms-2"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={loading}
            >
              +
            </button>
          </div>
          <p className="fw-bold mb-0">
            €{(pricePerUnit * item.quantity).toFixed(2)}
          </p>
          <div className="text-muted">
            €{pricePerUnit.toFixed(2)} cada{' '}
            {item.product.discount > 0 && (
              <span className="text-decoration-line-through ms-2 text-muted">
                €{item.product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;