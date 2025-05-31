import React from "react";

const StarBar = ({ rating, count, maxCount }) => {
  return (
    <div className="rating-bar mb-3">
      <div className="d-flex justify-content-between align-items-center mb-1">
        {rating == 1 ? (
          <span>{rating} estrela</span>
        ) : (
          <span>{rating} estrelas</span>
        )}
        <small className="text-muted">{count}</small>
      </div>
      <div className="progress" style={{ height: "10px" }}>
        <div
          className="progress-bar bg-warning"
          role="progressbar"
          style={{
            width: `${count ? (count / maxCount) * 100 : 0}%`,
          }}
          aria-valuenow={count ? (count / maxCount) * 100 : 0}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
};
export default StarBar;
