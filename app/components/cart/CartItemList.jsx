import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getProductById, removeFromCart } from "../../services/api";

const BACKEND_URL = "http://localhost:3000";

const getImageUrl = (image) => {
  if (!image) return "/assets/images/cao.gif";
  if (typeof image === "string") return `${BACKEND_URL}/images/${image}`; // Assuming image string is an ID/filename
  if (image.url && image.url.startsWith("http")) return image.url;
  if (image.url) return `${BACKEND_URL}/${image.url}`;
  return "/assets/images/cao.gif";
};

const CartItemList = ({ items, onUpdate }) => {
  const [fullItems, setFullItems] = useState([]);

  useEffect(() => {
    async function fetchFullProducts() {
      if (!items?.length) {
        setFullItems([]);
        return;
      }

      const itemsWithFullProducts = await Promise.all(
        items.map(async (item) => {
          try {
            const fullProduct = await getProductById(item.product._id);
            return {
              ...item,
              product: fullProduct,
            };
          } catch (error) {
            console.error("Failed to fetch product details for", item.product._id, error);
            return item; // fallback to original if fetch fails
          }
        })
      );

      setFullItems(itemsWithFullProducts);
    }

    fetchFullProducts();
  }, [items]);

  if (!fullItems.length) {
    return (
      <div className="alert alert-info text-center mt-4">
        O seu carrinho está vazio.
      </div>
    );
  }

  const hasActiveDiscount = (discount) => {
    if (!discount) return false;
    const now = new Date();
    const start = discount.start_date ? new Date(discount.start_date) : null;
    const end = discount.end_date ? new Date(discount.end_date) : null;
    return (!start || now >= start) && (!end || now <= end);
  };

  const calculateDiscountedPrice = (product) => {
    if (hasActiveDiscount(product.discount)) {
      const { type, value } = product.discount;
      if (type === "percentage") {
        return Math.max(0, product.price * (1 - value));
      } else if (type === "fixed") {
        return Math.max(0, product.price - value);
      }
    }
    return product.price;
  };

  const handleRemove = async (itemId, selectedColor, selectedSize) => {
    try {
      await removeFromCart(itemId, selectedColor, selectedSize);
      toast.success("Item removido do carrinho");
      onUpdate(); // Refresh cart from parent
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error);
      toast.error("Falha ao remover o item.");
    }
  };

  return (
    <div className="w-100">
      {fullItems.map((item) => {
        const product = item.product || {};
        const color = item.selectedColor || "Normal";
        const size = item.selectedSize || "Normal";

        console.log("product.images:", product.images);

        const discountActive = hasActiveDiscount(product.discount);
        const discountedPrice = calculateDiscountedPrice(product);

        return (
          <div
            key={`${product._id}-${color}-${size}`}
            className="card mb-3 bg-dark text-white d-flex flex-row align-items-center p-2"
            style={{ minWidth: 0 }}
          >
            <Link
              to={`/product/${product._id}`}
              className="d-flex align-items-center flex-grow-1 text-white text-decoration-none"
              style={{ minWidth: 0 }}
            >
              <img
                src={getImageUrl(product.images?.[0])}
                alt={product.name}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  marginRight: "1rem",
                  flexShrink: 0,
                }}
                className="rounded"
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h5
                  className="card-title mb-1"
                  style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
                >
                  {product.name}
                </h5>
                <p
                  className="card-text small mb-1"
                  style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
                >
                  {product.description}
                </p>
                <p
                  className="card-text small mb-1"
                  style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
                >
                  Cor: {color} | Tamanho: {size}
                </p>

                <p className="h6 mb-0">
                  {discountActive ? (
                    <>
                      <span className="badge bg-primary me-1">
                        {product.discount.type === "percentage"
                          ? `${(product.discount.value * 100).toFixed(0)}%`
                          : `-€${product.discount.value.toFixed(2)}`}
                      </span>
                      <span className="fw-bold">{discountedPrice.toFixed(2)}€</span>{" "}
                      <span className="text-muted text-decoration-line-through">
                        {product.price.toFixed(2)}€
                      </span>
                    </>
                  ) : (
                    <span>{product.price.toFixed(2)}€</span>
                  )}
                </p>
              </div>
            </Link>
            <button
              className="btn btn-danger btn-sm ms-2 flex-shrink-0"
              onClick={() => handleRemove(product._id, color, size)}
            >
              Remover
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CartItemList;