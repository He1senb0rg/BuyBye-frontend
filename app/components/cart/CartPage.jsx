import React from 'react';

const CartPage = ({ children }) => {
  return (
    <main className="container py-5">
      <div className="row gx-5">
        <div className="col-lg-8 mb-4">
          {children[0] /* CartHeader */}
          {children[1] /* CartItemsList */}
        </div>
        <div className="col-lg-4">
          {children[2] /* CartSummary */}
        </div>
      </div>
    </main>
  );
};

export default CartPage;