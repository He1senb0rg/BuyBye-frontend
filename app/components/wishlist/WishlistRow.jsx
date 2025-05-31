import React from "react";
import toast from "react-hot-toast";
import { removeFromWishlist } from "../../services/api";
import { Link } from "react-router-dom";

const WishlistRow = ({ product, onRemove }) => {
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
      <div className="card h-100 bg-dark text-white d-flex flex-row align-items-center p-2">
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
            }}
            className="rounded"
          />
          <div>
            <h5 className="card-title mb-1">{product.name}</h5>
            <p className="card-text small mb-1">{product.description}</p>
            <p className="h6 mb-0">{product.price}€</p>
          </div>
        </Link>
        <button className="btn btn-danger btn-sm ms-2" onClick={handleRemove}>
          Remover
        </button>
      </div>
    </div>
  );
};

export default WishlistRow;