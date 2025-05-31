import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getProductById,
  getProductReviewsStats,
  createReview,
  deleteReview,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  addToCart, // <-- Added import
} from "../../services/api";
import ProductImagesSwiper from "../../components/products/ProductImagesSwiper";
import Review from "../../components/reviews/Review";
import StarRating from "../../components/reviews/StarRating";
import StarBar from "../../components/reviews/StarBar";
import ProductOptions from "../../components/products/ProductOptions";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import StarSelector from "../../components/reviews/StarSelector";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [errorProduct, setErrorProduct] = useState(null);

  const [productStats, setProductStats] = useState({});
  const [loadingProductStats, setLoadingProductStats] = useState(true);
  const [errorProductStats, setErrorProductStats] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [isWishlisted, setIsWishlisted] = useState(false);

  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increaseQuantity = () => setQuantity((prev) => prev + 1);

  const hasActiveDiscount = (discount) => {
    if (!discount) return false;
    if (!discount.start_date || !discount.end_date) return true;
    const now = new Date();
    const start = new Date(discount.start_date);
    const end = new Date(discount.end_date);
    return now >= start && now <= end;
  };

  const calculateFinalPrice = () => {
    if (hasActiveDiscount(product.discount)) {
      const { type, value } = product.discount;
      if (type === "percentage") {
        return (product.price * (1 - value)).toFixed(2);
      } else if (type === "fixed") {
        return (product.price - value).toFixed(2);
      }
    }
    return product.price;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        if (!response || response.error) throw new Error("Produto não encontrado");
        setProduct(response);
      } catch (error) {
        setErrorProduct("Failed to fetch product");
        navigate("/404");
      } finally {
        setLoadingProduct(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await getProductReviewsStats(id);
        setProductStats(response);
      } catch (error) {
        setErrorProductStats("Failed to fetch product");
      } finally {
        setLoadingProductStats(false);
      }
    };

    const checkIfWishlisted = async () => {
      try {
        if (!user) return;
        const wishlist = await getWishlist();
        const found = wishlist.some((item) => item._id === id);
        setIsWishlisted(found);
      } catch (err) {
        console.error("Failed to check wishlist:", err);
      }
    };

    fetchProduct();
    fetchReviews();
    checkIfWishlisted();
  }, [id, user]);

  const maxCount = Math.max(
    productStats[5] || 0,
    productStats[4] || 0,
    productStats[3] || 0,
    productStats[2] || 0,
    productStats[1] || 0
  );

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [deleteReviewId, setDeleteReviewId] = useState(null);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Por favor, atribua uma classificação.");
      return;
    }

    try {
      const response = await createReview({ productId: id, rating, comment });
      if (response.error) throw new Error("Erro ao submeter a avaliação");

      toast.success("Avaliação enviada com sucesso!");
      setProduct((prev) => ({
        ...prev,
        reviews: [response, ...(prev.reviews || [])],
      }));
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error("Erro ao enviar avaliação.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await deleteReview(reviewId);
      if (response.error) throw new Error("Erro ao apagar a avaliação");

      toast.success("Avaliação apagada com sucesso!");
      setProduct((prev) => ({
        ...prev,
        reviews: prev.reviews.filter((review) => review._id !== reviewId),
      }));
    } catch (err) {
      toast.error("Erro ao apagar avaliação.");
    }
  };

  const toggleWishlist = async () => {
    if (!user) {
      toast.error("Inicie sessão para adicionar à wishlist.");
      return;
    }

    try {
      if (isWishlisted) {
        await removeFromWishlist(product._id);
        setIsWishlisted(false);
        toast("Removido da lista wishlist.");
      } else {
        await addToWishlist(product._id);
        setIsWishlisted(true);
        toast.success("Adicionado à wishlist!");
      }
    } catch (err) {
      toast.error("Erro ao atualizar wishlist.");
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Inicie sessão para adicionar ao carrinho.");
      return;
    }

    try {
      const item = {
        productId: product._id,
        quantity,
      };

      const response = await addToCart(item);

      if (response.error) {
        throw new Error(response.error);
      }

      toast.success("Produto adicionado ao carrinho!");
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      toast.error("Erro ao adicionar ao carrinho.");
    }
  };

  return (
    <main>
      {loadingProduct ? (
        <p>Loading...</p>
      ) : (
        <>
          <section className="container pb-3 pt-4">
            <div className="row">
              <div className="col">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Novidades
                    </li>
                  </ol>
                </nav>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-6">
                <ProductImagesSwiper imageFiles={product.images} />
              </div>
              <div className="col-12 col-md-6">
                <div className="d-flex flex-column justify-content-between h-100">
                  <div>
                    <div className="d-flex">
                      <h1 className="h2">{product.name}</h1>
                      {product.discount && (
                        <span className="badge bg-primary p-1 m-2 fs-5">
                          {product.discount.type === "percentage"
                            ? `-${product.discount.value * 100}%`
                            : `-${product.discount.value}€`}
                        </span>
                      )}
                    </div>

                    <div className="d-flex justify-content-between">
                      {product.discount ? (
                        <div className="d-flex">
                          <p className="h4 me-2">{calculateFinalPrice()}€</p>
                          <p className="text-decoration-line-through text-muted">
                            {product.price}€
                          </p>
                        </div>
                      ) : (
                        <p className="h4">{product.price}€</p>
                      )}
                      <div>
                        <StarRating rating={product.averageRating} />
                        <small className="text-muted">
                          ({product.averageRating})
                        </small>
                      </div>
                    </div>
                    <hr />
                    <p className="h5">Descrição</p>
                    <p className="text-body-secondary">{product.description}</p>

                    {product.colors?.length > 0 && (
                      <div className="pb-3">
                        <ProductOptions options={product.colors} type="color" />
                      </div>
                    )}
                    {product.sizes?.length > 0 && (
                      <div className="pb-3">
                        <ProductOptions options={product.sizes} type="size" />
                      </div>
                    )}

                    <div className="row mt-5">
                      <div className="col-6 col-lg-6 col-xl-3 pe-0 mb-3">
                        <div className="input-group">
                          <button
                            className="btn btn-primary"
                            onClick={decreaseQuantity}
                          >
                            <i className="bi bi-dash fw-bold"></i>
                          </button>
                          <input
                            className="form-control border-primary"
                            value={quantity}
                            readOnly
                          />
                          <button
                            className="btn btn-primary"
                            onClick={increaseQuantity}
                          >
                            <i className="bi bi-plus-lg fw-bold"></i>
                          </button>
                        </div>
                      </div>

                      <div className="col-6 col-lg-6 col-xl-auto d-flex justify-content-end mb-3">
                        <button
                          className="btn btn-primary justify-content-end w-100"
                          type="button"
                          onClick={toggleWishlist}
                        >
                          <i className={`bi ${isWishlisted ? "bi-heart-fill" : "bi-heart"}`}></i>
                        </button>
                      </div>

                      <div className="col-1 col-lg-12 col-xl ps-2 ps-lg-0 w-100 mb-3">
                        <button
                          className={`btn w-100 h-100 fw-bold ${
                            product.stock > 0 ? "btn-primary" : "btn-secondary"
                          }`}
                          disabled={product.stock <= 0}
                          onClick={handleAddToCart}
                        >
                          {product.stock > 0 ? "Adicionar ao Carrinho" : "Sem Stock"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
 </>
      )}

      <div className="modal fade" id="deleteModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Apagar Comentário</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Fechar"
              ></button>
            </div>
            <div className="modal-body">
              Tens a certeza que queres apagar este comentário? Esta ação não pode ser revertida.
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => handleDeleteReview(deleteReviewId)}
              >
                Apagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;