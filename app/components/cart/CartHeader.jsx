import React from 'react';

const CartHeader = () => {
  return (
    <div className="mb-4">
      <h2 className="fw-bold">O seu Carrinho</h2>
      <hr className="mt-0 mb-3" />
      <p className="text-muted">Reveja os seus items antes de finalizar a compra.</p>
    </div>
  );
};

export default CartHeader;