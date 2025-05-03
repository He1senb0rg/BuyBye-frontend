import React from 'react';
import CartPage from '../components/cart/CartPage';
import CartHeader from '../components/cart/CartHeader';
import CartItemsList from '../components/cart/CartItemList';
import CartSummary from '../components/cart/CartSummary';

const Cart = () => {
  return (
    <main className="container mt-4">
      <CartPage>
        <CartHeader />
        <div className="row">
          <div className="col-md-8">
            <CartItemsList />
          </div>
          <div className="col-md-4">
            <CartSummary />
          </div>
        </div>
      </CartPage>
    </main>
  );
};

export default Cart;