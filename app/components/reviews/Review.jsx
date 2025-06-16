import React from "react";
import StarRating from "./StarRating";
import StarSelector from "./StarSelector";
import { useAuth } from "../../contexts/AuthContext";

const Review = ({
  user,
  reviewId,
  comment,
  rating,
  createdAt,
  userId,
  reviewDelete,
  setReviewDelete,
  editReviewId,
  setEditReviewId,
  editRating,
  setEditRating,
  editComment,
  setEditComment,
  handleUpdateReview
}) => {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(date).toLocaleDateString("pt-PT", options);
  };

  const { user: authUser } = useAuth();
  const isUserReview = authUser && authUser.id === userId;
  const isEditing = editReviewId === reviewId;

  const handleStartEdit = () => {
    setEditReviewId(reviewId);
    setEditRating(rating);
    setEditComment(comment);
  };

  const handleCancelEdit = () => {
    setEditReviewId(null);
    setEditRating(0);
    setEditComment("");
  };

  return (
    <div className="row pt-4">
      <div className="col">
        <div className="card p-3">
          <div className="d-flex justify-content-between">
            <div className="mb-2 fs-4">
              <StarRating rating={rating} />
            </div>
            {isUserReview && !isEditing && (
              <div>
                <button
                  className="btn btn-hover-yellow me-2"
                  onClick={handleStartEdit}
                >
                  <i className="bi bi-pencil fs-4"></i>
                </button>
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

          {isEditing ? (
            <form onSubmit={handleUpdateReview}>
              <div className="mb-3">
                <StarSelector value={editRating} onChange={setEditRating} />
              </div>
              <textarea
                className="form-control mb-2"
                rows="3"
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
              ></textarea>
              <button className="btn btn-primary me-2" type="submit">
                Guardar
              </button>
              <button className="btn btn-secondary" type="button" onClick={handleCancelEdit}>
                Cancelar
              </button>
            </form>
          ) : (
            <>
              <p className="fw-bold">{comment}</p>
              <p className="text-muted">{formatDate(createdAt)}</p>
              <div className="d-flex align-items-center">
                <i className="bi bi-person-circle fs-2"></i>
                <p className="ps-2 mt-3">{user}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;