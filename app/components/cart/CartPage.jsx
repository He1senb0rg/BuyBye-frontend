import React, { useEffect, useState } from 'react';
import { getCart } from '../../services/api';
import CartItemsList from './CartItemList';
import CartSummary from './CartSummary';

const CartPage = () => {
  const [items, setItems] = useState([]);

  const fetchCart = async () => {
    try {
      const cart = await getCart();
      setItems(cart.items || []);
    } catch (err) {
      console.error('Erro ao carregar carrinho:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <main className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-1">
          <CartItemsList items={items} onUpdate={fetchCart} />
        </div>
        <div className="col-md-3">
          <CartSummary items={items} />
        </div>
      </div>
    </main>
  );
};

export default CartPage;