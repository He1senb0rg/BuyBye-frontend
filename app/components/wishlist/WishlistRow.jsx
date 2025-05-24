import React from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { removeFromWishlist } from "../../services/api";

const WishlistRow = ({ product }) => {
  const { user } = useAuth();

  const handleRemove = async () => {
    try {
      await removeFromWishlist(user._id, product._id);
      toast.success("Removed from wishlist");
      window.location.reload(); // or trigger a refresh via props/state
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item.");
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img
          src={product.images?.[0] || "/assets/images/cao.gif"}
          className="card-img-top"
          alt={product.name}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          <p className="h5">{product.price}€</p>
          <button className="btn btn-danger mt-2" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistRow;