import React, { useEffect, useState } from "react";
import { getCart } from "../../services/api";
import CartItemList from "./CartItemList";
import CartSummary from "./CartSummary";

const CartPage = () => {
  const [items, setItems] = useState([]);

  const fetchCart = async () => {
    try {
      const cart = await getCart();
      setItems(cart.items || []);
    } catch (err) {
      console.error("Erro ao carregar carrinho:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <main className="container-fluid">
      <div className="row">
        {/* Full width on xs, offset + 8 cols on md+ */}
        <div className="col-12 col-md-8 offset-md-1">
          <CartItemList items={items} onUpdate={fetchCart} />
        </div>
        {/* Full width on xs, 3 cols on md+ */}
        <div className="col-12 col-md-3 mt-4 mt-md-0">
          <CartSummary items={items} />
        </div>
      </div>
    </main>
  );
};

export default CartPage;