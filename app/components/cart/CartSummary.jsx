import React from 'react';
import { Link } from 'react-router-dom';

const CartSummary = () => {
  const subtotal = 65; // total of example items
  const shipping = 5;
  const total = subtotal + shipping;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-3">Resumo da Compra</h5>
        <ul className="list-group list-group-flush mb-3">
          <li className="list-group-item d-flex justify-content-between">
            <span>Subtotal</span>
            <strong>€{subtotal}</strong>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Envio</span>
            <strong>€{shipping}</strong>
          </li>
          <li className="list-group-item d-flex justify-content-between fw-bold">
            <span>Total</span>
            <strong>€{total}</strong>
          </li>
        </ul>
        <div className="mt-3">
        <button className="btn btn-primary w-100 mb-3">Finalizar Compra</button>
        <Link to="/shop" className="btn btn-outline-secondary w-100">
          Continue Shopping
        </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
