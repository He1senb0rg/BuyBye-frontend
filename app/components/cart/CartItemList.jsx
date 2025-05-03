import React from 'react';
import CartItem from './CartItem';

const CartItemsList = () => {
  // Sample static items for now
  const items = [
    { id: 1, name: 'Produto 1', description: 'Descrição breve.', price: 25, image: '/assets/sample.jpg' },
    { id: 2, name: 'Produto 2', description: 'Descrição breve.', price: 40, image: '/assets/sample.jpg' },
  ];

  return (
    <div>
      <h4 className="mb-3">Carrinho</h4>
      {items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CartItemsList;