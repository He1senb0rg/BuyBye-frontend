import React, { useState } from 'react';
import CartItem from './CartItem';

const CartItemsList = () => {
  const [items, setItems] = useState([]);

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