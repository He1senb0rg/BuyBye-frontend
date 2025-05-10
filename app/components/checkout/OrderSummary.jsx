import React from 'react';

const OrderSummary = () => {
  return (
    <div className="p-4 border bg-light rounded">
      <h5 className="mb-3">Resumo do pedido</h5>
      <div className="d-flex justify-content-between mb-2">
        <span>Item Total</span>
        <span>$99.99</span>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <span>Shipping</span>
        <span>$4.99</span>
      </div>
      <hr />
      <div className="d-flex justify-content-between fw-bold">
        <span>Total</span>
        <span>$104.98</span>
      </div>
    </div>
  );
};

export default OrderSummary;