import React from "react";
import StarRating from "./StarRating";
import { useAuth } from "../contexts/AuthContext";

const Review = ({ user, reviewId, comment, rating, createdAt, userId, setReviewDelete }) => {
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleDateString("pt-PT", options);
  };

  const { user: authUser } = useAuth();
  const isUserReview = authUser && authUser.id === userId;

  return (
    <div className="row pt-4">
      <div className="col">
        <div className="card p-3">
          <div className="d-flex justify-content-between">
            <div className="mb-2 fs-4">
              <StarRating rating={rating} />
            </div>
            {isUserReview && (
              <div>
                {/* <i className="bi bi-pencil-square fs-4"></i> */}
                <button
                  className="btn btn-hover-red"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                  type="button"
                    onClick={() => setReviewDelete(reviewId)}
                >
                  <i className="bi bi-trash fs-4"></i>
                </button>
              </div>
            )}
          </div>

          <p className="fw-bold">{comment}</p>
          <p className="text-muted">{formatDate(createdAt)}</p>
          <div className="d-flex align-items-center">
            <i className="bi bi-person-circle fs-2"></i>
            <p className="ps-2 mt-3">{user}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
