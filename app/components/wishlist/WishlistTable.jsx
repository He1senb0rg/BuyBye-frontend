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
      console.log("Resposta da lista de desejos:", res);

      if (!res || !res.items) {
        toast.error("Falha ao carregar a lista de desejos.");
      } else {
        setWishlistItems(res.items);
      }
    } catch (err) {
      console.error("Erro ao obter a lista de desejos:", err);
      toast.error("Erro ao carregar a lista de desejos.");
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
    return <p className="text-center mt-4">Por favor, inicie sessão para ver a sua lista de desejos.</p>;
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
      {wishlistItems.length === 0 ? (
        <div className="alert alert-info text-center mt-4">
          A sua lista de desejos está vazia.
        </div>
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