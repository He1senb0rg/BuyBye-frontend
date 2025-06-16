import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getProductById, removeFromWishlist } from "../../services/api";
import { Link } from "react-router-dom";

const BACKEND_URL = "http://localhost:3000";

const getImageUrl = (image) => {
  if (!image) return "/assets/images/cao.gif";
  if (typeof image === "string") return `${BACKEND_URL}/images/${image}`;
  if (image.url && image.url.startsWith("http")) return image.url;
  if (image.url) return `${BACKEND_URL}/${image.url}`;
  return "/assets/images/cao.gif";
};

const WishlistRow = ({ product: initialProduct, onRemove }) => {
  const [product, setProduct] = useState(initialProduct);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const fullProduct = await getProductById(initialProduct._id);
        setProduct(fullProduct);
      } catch (error) {
        console.error("Failed to fetch full product details:", error);
        setProduct(initialProduct); // fallback
      }
    }
    fetchProduct();
  }, [initialProduct]);

  const handleRemove = async () => {
    try {
      await removeFromWishlist(product._id);
      toast.success("Removido da lista de desejos");
      onRemove(product._id);
    } catch (error) {
      console.error("Erro ao remover da lista de desejos:", error);
      toast.error("Falha ao remover o item.");
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 bg-dark text-white d-flex flex-column justify-content-between p-2">
        <Link
          to={`/product/${product._id}`}
          className="text-white text-decoration-none flex-grow-1"
        >
          <div className="d-flex align-items-center mb-3">
            <img
              src={getImageUrl(product.images?.[0])}
              alt={product.name}
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                marginRight: "1rem",
              }}
              className="rounded"
            />
            <div>
              <h5 className="card-title mb-1">{product.name}</h5>
              <p className="card-text small mb-1">{product.description}</p>
              <p className="h6 mb-0">{product.price.toFixed(2)}€</p>
            </div>
          </div>
        </Link>
        <button className="btn btn-danger btn-sm align-self-end" onClick={handleRemove}>
          Remover
        </button>
      </div>
    </div>
  );
};

export default WishlistRow;