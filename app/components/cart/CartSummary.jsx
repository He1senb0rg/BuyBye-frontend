import React from 'react';

const CartSummary = () => {
  return (
    <div className="position-sticky" style={{ top: '1rem' }}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Resumo da Compra</h5>
          <p className="card-text">Subtotal: €100.00</p>
          <p className="card-text">Envio: €5.00</p>
          <hr />
          <h6>Total: €105.00</h6>
          <button className="btn btn-primary w-100 mt-3">Finalizar Compra</button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
