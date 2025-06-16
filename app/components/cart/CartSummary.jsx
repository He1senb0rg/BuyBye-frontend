import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CartSummary = ({ items }) => {
  const navigate = useNavigate();

  const getDiscountedPrice = (product) => {
    if (!product.discount) return product.price;

    const { type, value, start_date, end_date } = product.discount;

    const now = new Date();
    const isActive = (!start_date || new Date(start_date) <= now) &&
                     (!end_date || new Date(end_date) >= now);

    if (!isActive) return product.price;

    if (type === 'percentage') {
      // value is fractional, e.g., 0.5 means 50%
      return Math.max(0, product.price * (1 - value));
    } else if (type === 'fixed') {
      return Math.max(0, product.price - value);
    }

    return product.price;
  };

  const subtotal = items.reduce((acc, item) => {
    const pricePerUnit = getDiscountedPrice(item.product);
    return acc + pricePerUnit * (item.quantity || 0);
  }, 0);

  const shipping = items.length > 0 ? 5 : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="position-sticky" style={{ top: '1rem' }}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Resumo da Compra</h5>
          <p className="card-text">Subtotal: €{subtotal.toFixed(2)}</p>
          <p className="card-text">Envio: €{shipping.toFixed(2)}</p>
          <hr />
          <p className="fw-bold">Total: €{total.toFixed(2)}</p>
          <button onClick={handleCheckout} className="btn btn-primary w-100 mt-3">
            Finalizar Compra
          </button>
          <div className="mt-3">
            <Link to="/shop" className="btn btn-outline-secondary w-100">
              Continue as suas compras
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;