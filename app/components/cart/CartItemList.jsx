import React from 'react';
import CartItem from './CartItem';

const CartItemsList = ({ items, onUpdate }) => {
  return (
    <div className="w-100">
      {items.length > 0 ? (
        items.map(item => (
          <CartItem
            key={`${item.product._id}-${item.selectedColor}-${item.selectedSize}`}
            item={item}
            onUpdate={onUpdate}
          />
        ))
      ) : (
        <div className="alert alert-info text-center mt-4">
          O seu carrinho está vazio.
        </div>
      )}
    </div>
  );
};

export default CartItemsList;