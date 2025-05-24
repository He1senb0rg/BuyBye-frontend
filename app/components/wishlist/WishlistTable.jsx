import React, { useEffect, useState } from "react";
import WishlistRow from "./WishlistRow";
import { useAuth } from "../../contexts/AuthContext";
import { getWishlist } from "../../services/api";
import { Spinner } from "react-bootstrap";
import toast from "react-hot-toast";

const WishlistTable = () => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchWishlist = async () => {
    console.log("Fetching wishlist for user:", user);

    const userId = user?.id || user?._id;
    if (!userId) {
      console.warn("No valid user ID found:", user);
      return;
    }

    try {
      const res = await getWishlist(userId);
      console.log("Wishlist response:", res);

      if (!res || !res.items) {
        toast.error("Failed to load wishlist.");
        return;
      }

      setWishlistItems(res.items);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      toast.error("Error fetching wishlist.");
    }
  };

  fetchWishlist();
}, [user]);

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
              <WishlistRow key={item.product._id} product={item.product} />
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default WishlistTable;