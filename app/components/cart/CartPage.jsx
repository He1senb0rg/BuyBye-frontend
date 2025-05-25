import React from 'react';
import CartItemsList from './CartItemList';
import CartSummary from './CartSummary';
import CartHeader from './CartHeader';

const CartPage = () => {
  return (
    <main className="container-fluid">
      <div className="row">
        {/* Left side: header + items */}
        <div className="col-md-8 offset-md-1">
          <CartHeader />
          <CartItemsList />
        </div>

        {/* Right side: summary */}
        <div className="col-md-3">
          <CartSummary />
        </div>
      </div>
    </main>
  );
};

export default CartPage;