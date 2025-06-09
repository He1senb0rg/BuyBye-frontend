import React, { useEffect } from 'react';

const OrderSummary = ({ items = [], onTotalChange }) => {
  // Logic copied from CartSummary
  const subtotal = items.reduce((acc, item) => {
    const price = item.product?.price || item.price || 0;
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0);

  const shipping = items.length > 0 ? 5 : 0;
  const total = subtotal + shipping;

  useEffect(() => {
  if (onTotalChange && items.length > 0) {
    onTotalChange(total);
  }
}, [total]);

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 bg-secondary-subtle" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="card-body">
        <h5 className="card-title fw-semibold mb-4">Resumo do Pedido</h5>
        <ul className="list-unstyled mb-3">
          {items.map((item, index) => {
            const name = item.product?.name || item.name || 'Produto';
            const quantity = item.quantity || 1;
            const price = item.product?.price || item.price || 0;
            const itemTotal = price * quantity;

            return (
              <li key={index} className="d-flex justify-content-between text-muted mb-2">
                <span>{name} × {quantity}</span>
                <span>€{itemTotal.toFixed(2)}</span>
              </li>
            );
          })}
          <li className="d-flex justify-content-between text-muted mb-2">
            <span>Envio</span>
            <span>€{shipping.toFixed(2)}</span>
          </li>
        </ul>
        <hr className="my-3" />
        <div className="d-flex justify-content-between fw-bold fs-5">
          <span>Total</span>
          <span>€{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;