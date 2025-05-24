import React, { useState } from "react";
import StarRating from "./StarRating";
import { addToWishlist } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";

const Product = ({
  name,
  description,
  price,
  discount,
  images,
  rating,
  link,
  _id,
}) => {
  const { user } = useAuth();
  const [isAdding, setIsAdding] = useState(false);

  const hasActiveDiscount = (discount) => {
    if (!discount) return false;
    if (!discount.start_date || !discount.end_date) return true;

    const now = new Date();
    const start = new Date(discount.start_date);
    const end = new Date(discount.end_date);

    return now >= start && now <= end;
  };

  const calculateFinalPrice = () => {
    if (hasActiveDiscount(discount)) {
      const { type, value } = discount;

      if (type === "percentage") {
        return (price * (1 - value)).toFixed(2);
      } else if (type === "fixed") {
        return price - value;
      }
    }

    return price;
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      toast.error("You must be logged in to add items to your wishlist.");
      return;
    }

    try {
      setIsAdding(true);
      await addToWishlist(user._id, _id);
      toast.success("Added to wishlist!");
    } catch (err) {
      toast.error("Failed to add to wishlist.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="col">
      <div className="card">
        <a
          href={link}
          className="text-decoration-none product-image rounded mx-3 mt-3"
        >
          <img
            src={images?.[0] || "/assets/images/cao.gif"}
            className="card-img-top rounded"
            alt={name}
          />
        </a>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <a href={link} className="text-decoration-none text-light">
              <h5
                className="card-title product-title text-wrap"
                style={{ transition: "0.3s" }}
              >
                {name}
              </h5>
            </a>
            <button
              className="btn p-0 border-0 bg-transparent"
              onClick={handleAddToWishlist}
              disabled={isAdding}
              title="Add to Wishlist"
            >
              <i className="bi bi-heart-fill text-danger fs-5" />
            </button>
          </div>
          {discount && (
            <div
              className="card-img-overlay"
              style={{ pointerEvents: "none" }}
            >
              <span className="badge bg-primary p-2 mt-1 ms-1 fs-5">
                {discount.type === "percentage"
                  ? `-${discount.value * 100}%`
                  : `-${discount.value}€`}
              </span>
            </div>
          )}
          <p className="card-text">{description}</p>
          <div className="d-flex justify-content-between">
            {discount ? (
              <div className="d-flex">
                <p className="h4 me-2">{calculateFinalPrice()}€</p>
                <p className="text-decoration-line-through text-muted">
                  {price}€
                </p>
              </div>
            ) : (
              <p className="h4">{price}€</p>
            )}
            <div>
              <StarRating rating={rating} />
              <small className="text-muted">({rating})</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;