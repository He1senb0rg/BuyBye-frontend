import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { removeFromCart } from "../../services/api";

const CartItemList = ({ items, onUpdate }) => {
  if (!items?.length) {
    return (
      <div className="alert alert-info text-center mt-4">
        O seu carrinho está vazio.
      </div>
    );
  }

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
      {items.map((item) => {
        const product = item.product || {};
        const color = item.selectedColor || "Normal";
        const size = item.selectedSize || "Normal";

        return (
          <div
            key={`${product._id}-${color}-${size}`}

            to={`/product/${product._id}`}

            className="card mb-3 bg-dark text-white d-flex flex-row align-items-center p-2"
          >
            <Link
              to={`/product/${product._id}`}
              className="d-flex align-items-center flex-grow-1 text-white text-decoration-none"
            >
              <img
                src={product.images?.[0] || "/assets/images/cao.gif"}
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
                <h5 className="card-title mb-1 text-truncate">{product.name}</h5>
                <p className="card-text small mb-1 text-truncate">{product.description}</p>
                <p className="card-text small mb-1">
                  Cor: {color} | Tamanho: {size}
                </p>
                <p className="h6 mb-0">{product.price}€</p>
              </div>
            </Link>
            <button
              className="btn btn-danger btn-sm ms-2"
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