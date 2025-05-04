import React from 'react';

const CartPage = ({ children }) => {
  return (
    <main className="container-fluid">
      <div className="row">
        {/* Make left column take more space on large screens */}
        <div className="col-md-8 offset-md-1">
          {children[0] /* CartHeader */}
          {children[1] /* CartItemsList */}
        </div>

        {/* CartSummary stays on the right, smaller */}
        <div className="col-md-4">
          {children[2] /* CartSummary */}
        </div>
      </div>
    </main>
  );
};

export default CartPage;