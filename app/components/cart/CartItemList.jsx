import React, { useState } from 'react';
import CartItem from './CartItem';

const CartItemsList = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Produto 1', price: 25, image: '../../assets/images/cao.gif' },
    { id: 2, name: 'Produto 2', price: 40, image: '../../assets/images/cao.gif' },
  ]);

  const handleRemove = (id) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  return (
    <div className="w-100">
      {items.length > 0 ? (
        items.map(item => (
          <CartItem key={item.id} item={item} onRemove={handleRemove} />
        ))
      ) : (
        <div className="alert alert-info text-center mt-4" role="alert">
          O seu carrinho está vazio.
        </div>
      )}
    </div>
  );
};

export default CartItemsList;