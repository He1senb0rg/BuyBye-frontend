import React from "react";

const StarRating = ({ rating }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i key={`full-${i}`} className="bi bi-star-fill text-warning" />
      );
    }

    if (halfStar) {
      stars.push(<i key="half" className="bi bi-star-half text-warning" />);
    }

    while (stars.length < 5) {
      stars.push(
        <i key={`empty-${stars.length}`} className="bi bi-star text-warning" />
      );
    }

    return stars;
  };

  return renderStars(rating);
};
export default StarRating;
