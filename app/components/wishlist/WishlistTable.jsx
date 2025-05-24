import React, { useEffect, useState, useCallback } from "react";
import WishlistRow from "./WishlistRow";
import { useAuth } from "../../contexts/AuthContext";
import { getWishlist } from "../../services/api";
import { Spinner } from "react-bootstrap";
import toast from "react-hot-toast";

const WishlistTable = () => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = useCallback(async () => {
  try {
    const res = await getWishlist();
    console.log("Wishlist response:", res);

    if (!res || !res.items) {
      toast.error("Failed to load wishlist.");
    } else {
      setWishlistItems(res.items);
    }
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    toast.error("Error fetching wishlist.");
  } finally {
    setLoading(false);
  }
}, [user]);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [user, fetchWishlist]);

  const handleItemRemoved = (productId) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.product?._id !== productId)
    );
  };

  if (!user) {
    return <p className="text-center mt-4">Please log in to view your wishlist.</p>;
  }

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>No items in your wishlist.</p>
      ) : (
        <div className="row">
          {wishlistItems.map((item) =>
            item.product ? (
              <WishlistRow
                key={item.product._id}
                product={item.product}
                onRemove={handleItemRemoved}
              />
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default WishlistTable;