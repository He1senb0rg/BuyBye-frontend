import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountNavigation from "../../components/accountDetailsComponents/AccountNavigation";
import Review from "../../components/reviews/Review";
import { useAuth } from "../../contexts/AuthContext";
import { fetchUserReviews } from "../../services/api";

const ReviewsPage = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadReviews = async () => {
      try {
        if (!user) return;
        const data = await fetchUserReviews(user.id);
        setReviews(data);
      } catch (err) {
        console.error("Error loading reviews:", err);
        setError("Erro ao carregar as avaliações.");
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [user]);

  const handleReviewClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <main>
      <div className="container-xl px-4 mt-4">
        <AccountNavigation activePage="reviews" />
        <hr className="mt-0 mb-3" />

        {loading ? (
          <p>A carregar...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : reviews.length === 0 ? (
          <p>Não há avaliações para mostrar.</p>
        ) : (
          <div className="row g-4">
            {reviews.map((review) => (
              <div
                key={review.id || `${review.userId}-${review.productId}`} // Ensure unique key
                className="col-md-6 col-lg-4"
              >
                <div
                  className="card h-100 shadow-sm"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleReviewClick(review.product._id)}
                >
                  {review.product?.image && (
                    <img
                      src={review.product.image}
                      className="card-img-top"
                      alt={review.product.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{review.product?.name || "Produto sem nome"}</h5>
                    <Review
                      user={review.userName}
                      reviewId={review.id}
                      comment={review.comment}
                      rating={review.rating}
                      createdAt={review.createdAt}
                      userId={review.userId}
                      setEditReviewId={() => {}}
                      editReviewId={null}
                      editRating={0}
                      setEditRating={() => {}}
                      editComment=""
                      setEditComment={() => {}}
                      handleUpdateReview={() => {}}
                      setReviewDelete={() => {}}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ReviewsPage;