import React, { createContext, useContext, useEffect, useState } from "react";
import { getCart, addToCart, removeFromCart, updateCartItem } from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const data = await getCart();
      setCart(data.cartItems || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item) => {
    if (!isAuthenticated) return;
    await addToCart(item);
    await fetchCart();
  };

  const removeItem = async (productId) => {
    if (!isAuthenticated) return;
    await removeFromCart(productId);
    await fetchCart();
  };

  const updateItem = async (productId, data) => {
    if (!isAuthenticated) return;
    await updateCartItem(productId, data);
    await fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]); // refetch when auth status changes

  return (
    <CartContext.Provider value={{ cart, loading, addItem, removeItem, updateItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);