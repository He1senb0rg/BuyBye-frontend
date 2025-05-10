import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getProductById, getProductReviewsStats, createReview, deleteReview } from "../services/api";
import ProductImagesSwiper from "../components/ProductImagesSwiper";
import Review from "../components/Review";
import StarRating from "../components/StarRating";
import StarBar from "../components/StarBar";
import ProductOptions from "../components/ProductOptions";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import StarSelector from "../components/StarSelector";

const ProductPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [errorProduct, setErrorProduct] = useState(null);

  const [productStats, setProductStats] = useState({});
  const [loadingProductStats, setLoadingProductStats] = useState(true);
  const [errorProductStats, setErrorProductStats] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

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
        return product.price - value;
      }
    }

    return product.price;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response);
        console.log("Product response:", response);
      } catch (error) {
        console.errorProduct("Failed to fetch product:", error);
        setErrorProduct("Failed to fetch product");
      } finally {
        setLoadingProduct(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await getProductReviewsStats(id);
        setProductStats(response);
        console.log("Product response:", response);
      } catch (error) {
        console.errorProductStats("Failed to fetch product:", error);
        setErrorProductStats("Failed to fetch product");
      } finally {
        setLoadingProductStats(false);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  const maxCount = Math.max(
    productStats[5] || 0,
    productStats[4] || 0,
    productStats[3] || 0,
    productStats[2] || 0,
    productStats[1] || 0
  );

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!rating) {
      toast.error("Por favor, atribua uma classificação.");
      return;
    }
  
    try {
      const response = await createReview({productId: id, rating, comment});
  
      if (response.error) {
        throw new Error("Erro ao submeter a avaliação");
      }
  
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

  const [deleteReviewId, setDeleteReviewId] = useState(null);

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await deleteReview(reviewId);
      
      if (response.error) {
        throw new Error("Erro ao apagar a avaliação");
      }

      toast.success("Avaliação apagada com sucesso!");

      setProduct((prev) => ({
        ...prev,
        reviews: prev.reviews.filter((review) => review._id !== reviewId),
      }));
    } catch (err) {
      toast.error("Erro ao apagar avaliação.");
    }
  }

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
                      <a href="shop.html">Home</a>
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
                        <>
                          <div className="d-flex">
                            <p className="h4 me-2">{calculateFinalPrice()}€</p>
                            <p className="text-decoration-line-through text-muted ">
                              {product.price}€
                            </p>
                          </div>
                        </>
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
                    <div>
                      <p className="h5">Descrição</p>
                      <p className="text-body-secondary">
                        {product.description}
                      </p>
                    </div>
                    {product.colors && product.colors.length > 0 && (
                      <div className="pb-3">
                        <ProductOptions options={product.colors} type="color" />
                      </div>
                    )}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="pb-3">
                        <ProductOptions options={product.sizes} type="size" />
                      </div>
                    )}
                    <div className="row mt-5">
                      <div className="col-6 col-lg-6 col-xl-3 pe-0 mb-3">
                        <div className="input-group">
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={decreaseQuantity}
                          >
                            <i className="bi bi-dash fw-bold"></i>
                          </button>

                          <input
                            className="form-control border-primary"
                            name="quantity"
                            id="quantityInput"
                            type="number"
                            value={quantity}
                            min="1"
                            readOnly
                          />
                          <button
                            className="btn btn-primary"
                            type="button"
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
                        >
                          <i className="bi bi-heart"></i>
                        </button>
                      </div>
                      <div className="col-1 col-lg-12 col-xl ps-2 ps-lg-0 w-100 mb-3">
                        <button
                          className="btn btn-primary w-100 h-100 fw-bold"
                          type="button"
                        >
                          Adicionar ao Carrinho
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-body-tertiary">
            <div className="container py-4">
              <p className="h2">Avaliações</p>
              <div className="row">
                <div className="col-md-4 text-center">
                  <h1 className="display-4 mt-5 mb-4 fw-bold">
                    {product.averageRating}
                  </h1>
                  <div className="mb-3 fs-4">
                    <StarRating rating={product.averageRating} />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="rating-bars">
                    {loadingProductStats ? (
                      <div>Loading...</div>
                    ) : (
                      [5, 4, 3, 2, 1].map((star) => (
                        <StarBar
                          key={star}
                          rating={star}
                          count={productStats[star] || 0}
                          maxCount={maxCount || 0}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <div className="card bg-dark">
                    <div className="card-body">
                      <div className="d-flex justify-content-center p-3 pt-3 flex-column">
                        {user ? (
                          <form onSubmit={handleSubmitReview}>
                            <div className="mb-3">
                              <p className="h4">
                                Diga o que acha deste produto!
                              </p>
                              <div className="fs-4">
                                <StarSelector value={rating} onChange={setRating} />
                              </div>
                            </div>
                            <textarea
                              className="form-control"
                              rows="3"
                              placeholder="Escreva aqui a sua avaliação..."
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <button
                              className="btn btn-primary mt-2"
                              type="submit"
                            >
                              Enviar Avaliação
                            </button>
                          </form>
                        ) : (
                          <>
                            <p className="fs-4 fw-semibold">
                              Junta-te à conversa e diz o que achaste deste
                              produto
                            </p>
                            <p className="fs-5">
                              <a
                                className="fw-semibold text-decoration-none"
                                href="/register"
                              >
                                Cria uma conta
                              </a>{" "}
                              ou{" "}
                              <a
                                className="fw-semibold text-decoration-none"
                                href="/login"
                              >
                                inicia sessão
                              </a>{" "}
                              para poder deixar a sua avaliação!
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {product?.reviews?.length > 0 ? (
                product.reviews.map((review, index) => (
                  <Review
                    key={index}
                    reviewId={review._id}
                    userId={review.user._id}
                    user={review.user.name}
                    comment={review.comment}
                    rating={review.rating}
                    createdAt={review.createdAt}
                    reviewDelete={handleDeleteReview}
                    setReviewDelete={setDeleteReviewId}
                  />
                ))
              ) : (
                <p className="text-muted pt-4">Sem avaliações ainda.</p>
              )}
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
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="button" data-bs-dismiss="modal" className="btn btn-danger" onClick={() => handleDeleteReview(deleteReviewId)}>
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
