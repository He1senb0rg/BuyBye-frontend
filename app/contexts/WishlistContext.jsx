// context/WishlistContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getWishlist, addToWishlist, removeFromWishlist } from "../services/api";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const data = await getWishlist();
      setWishlist(data.wishlist || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId) => {
    if (!isAuthenticated) return;
    await addToWishlist(productId);
    await fetchWishlist();
  };

  const removeItem = async (productId) => {
    if (!isAuthenticated) return;
    await removeFromWishlist(productId);
    await fetchWishlist();
  };

  useEffect(() => {
    fetchWishlist();
  }, [isAuthenticated]);

  return (
    <WishlistContext.Provider value={{ wishlist, loading, addItem, removeItem }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);