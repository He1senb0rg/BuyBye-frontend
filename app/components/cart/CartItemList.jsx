import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import { getCart, updateCartItem, removeFromCart } from '../../services/api';

const CartItemsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setItems(data.items || []);
    } catch (err) {
      console.error('Erro ao carregar carrinho:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (item, newQty) => {
    await updateCartItem(item.product._id, item.selectedColor, item.selectedSize, newQty);
    fetchCart();
  };

  const handleRemove = async (item) => {
    await removeFromCart(item.product._id, item.selectedColor, item.selectedSize);
    fetchCart();
  };

  return (
    <div className="w-100">
      {loading ? (
        <div className="text-center">A carregar...</div>
      ) : items.length > 0 ? (
        items.map((item) => (
          <CartItem
            key={`${item.product._id}-${item.selectedColor}-${item.selectedSize}`}
            item={item}
            onUpdate={fetchCart}
            onRemove={fetchCart}
          />
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