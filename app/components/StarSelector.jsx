import React, { useState } from "react";

const StarSelector = ({ value = 0, onChange }) => {
  const [hovered, setHovered] = useState(0);

  const handleClick = (rating) => {
    onChange(rating);
  };

  const handleMouseEnter = (rating) => {
    setHovered(rating);
  };

  const handleMouseLeave = () => {
    setHovered(0);
  };

  return (
    <div className="star-selector d-flex">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = hovered ? star <= hovered : star <= value;

        return (
          <i
            key={star}
            className={`bi ${isFilled ? "bi-star-fill" : "bi-star"} text-warning fs-4 me-1`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
          ></i>
        );
      })}
      <span className="ms-2">{hovered || value} / 5</span>
    </div>
  );
};

export default StarSelector;