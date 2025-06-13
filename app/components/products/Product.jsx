import React, { useState, useEffect } from "react";
import StarRating from "../reviews/StarRating";
import { addToWishlist, removeFromWishlist, checkIfInWishlist } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-hot-toast";

const BACKEND_URL = "http://localhost:3000";

const getImageUrl = (image) => {
  if (!image) return "/assets/images/cao.gif";
  if (typeof image === "string") return image;
  if (image.filename) return `${BACKEND_URL}/api/files/${image.filename}`;
  return "/assets/images/cao.gif";
};

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
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Debug _id presence
  useEffect(() => {
    console.log("Product _id:", _id);
  }, [_id]);

  // Fetch initial wishlist status only if _id exists
  useEffect(() => {
    const fetchWishlistStatus = async () => {
      if (user && _id) {
        try {
          const { isWishlisted } = await checkIfInWishlist(_id);
          setIsWishlisted(isWishlisted);
        } catch (error) {
          console.error("Falha ao adicionar à lista de desejos.", error);
        }
      }
    };

    fetchWishlistStatus();
  }, [_id, user]);

  const hasActiveDiscount = (discount) => {
    if (!discount) return false;
    const now = new Date();
    if (!discount.start_date || !discount.end_date) return true;

    const start = new Date(discount.start_date);
    const end = new Date(discount.end_date);

    return now >= start && now <= end;
  };

  const calculateFinalPrice = () => {
    if (hasActiveDiscount(discount)) {
      const { type, value } = discount;
      if (type === "percentage") return Math.max(price * (1 - value), 0).toFixed(2);
      if (type === "fixed") return Math.max(price - value, 0).toFixed(2);
    }
    return price.toFixed(2);
  };

  const handleWishlistToggle = async () => {
    if (!user) {
      toast.error("Deves estar logged in para alterar a lista de desejos.");
      return;
    }
    if (!_id) {
      toast.error("Produto de ID inválido.");
      return;
    }

    setIsProcessing(true);

    try {
      if (isWishlisted) {
        await removeFromWishlist(_id);
        toast("Removido da lista de desejos.");
      } else {
        await addToWishlist(_id);
        toast.success("Adicionado à lista de desejos.");
      }
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error(error);
      toast.error("Falha ao atualizar a lista de desejos.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="col">
      <div className="card h-100 d-flex flex-column">
        <a href={link} className="text-decoration-none product-image rounded mx-3 mt-3">
          <img src={getImageUrl(images?.[0])} className="card-img-top rounded" alt={name} />
        </a>

        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <a href={link} className="text-decoration-none text-light">
              <h5 className="card-title product-title text-wrap">{name}</h5>
            </a>

            <button
              className="btn p-0 border-0 bg-transparent"
              onClick={handleWishlistToggle}
              disabled={isProcessing}
              title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <i
                className={`bi ${isWishlisted ? "bi-heart-fill text-danger" : "bi-heart"} fs-5`}
              />
            </button>
          </div>

          {hasActiveDiscount(discount) && (
            <div className="card-img-overlay" style={{ pointerEvents: "none" }}>
              <span className="badge bg-primary p-2 mt-1 ms-1 fs-5">
                {discount.type === "percentage"
                  ? `-${Math.round(discount.value * 100)}%`
                  : `-${discount.value}€`}
              </span>
            </div>
          )}

          <p className="card-text product-description">{description}</p>

          <div className="d-flex justify-content-between align-items-center">
            {hasActiveDiscount(discount) ? (
              <div className="d-flex align-items-baseline">
                <p className="h4 me-2">{calculateFinalPrice()}€</p>
                <p className="text-decoration-line-through text-muted mb-0">
                  {price.toFixed(2)}€
                </p>
              </div>
            ) : (
              <p className="h4 mb-0">{price.toFixed(2)}€</p>
            )}

            <div className="d-flex align-items-center">
              <StarRating rating={rating} />
              <small className="text-muted ms-1">({rating})</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;