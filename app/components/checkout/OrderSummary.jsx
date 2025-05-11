import React, { useEffect, useState } from 'react';

const OrderSummary = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar o carrinho');
        }

        const data = await response.json();
        setCartItems(data.cartItems || []);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 4.99;
  const total = subtotal + shipping;

  if (loading) {
    return <div>Carregando resumo do pedido...</div>;
  }

  return (
    <div
      className="card border-0 shadow-sm rounded-4 p-4 bg-secondary-subtle"
      style={{ backgroundColor: '#f8f9fa' }}
    >
      <div className="card-body">
        <h5 className="card-title fw-semibold mb-4">Resumo do Pedido</h5>

        <ul className="list-unstyled mb-3">
          <li className="d-flex justify-content-between text-muted mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </li>
          <li className="d-flex justify-content-between text-muted mb-2">
            <span>Envio</span>
            <span>${shipping.toFixed(2)}</span>
          </li>
        </ul>

        <hr className="my-3" />

        <div className="d-flex justify-content-between fw-bold fs-5">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;