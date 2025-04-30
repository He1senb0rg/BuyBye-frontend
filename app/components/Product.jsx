import React from "react";
import StarRating from "./StarRating";

const Product = ({
  name,
  description,
  price,
  discount,
  images,
  rating,
  link,
}) => {
  const hasActiveDiscount = (discount) => {
    if (!discount) return false;

    if (!discount.start_date || !discount.end_date) return true;
  
    const now = new Date();
    const start = new Date(discount.start_date);
    const end = new Date(discount.end_date);
  
    return now >= start && now <= end;
  };

  const calculateFinalPrice = () => {
    if (hasActiveDiscount(discount)) {
      const { type, value } = discount;
  
      if (type === 'percentage') {
        return (price * (1 - value)).toFixed(2);
      } else if (type === 'fixed') {
        return price - value;
      }
    }
  
    return price;
  };

  return (
    <div className="col">
      <div className="card">
        <a
          href={link}
          className="text-decoration-none product-image rounded mx-3 mt-3"
        >
          <img src={images?.[0] || '/assets/images/cao.gif'} className="card-img-top rounded" alt={name} />
        </a>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <a href={link} className="text-decoration-none text-light">
              <h5
                className="card-title text-wrap"
                style={{ transition: "0.3s" }}
              >
                {name}
              </h5>
            </a>
            {discount ? (
              <div
                className="card-img-overlay"
                style={{ "pointer-events": "none" }}
              >
                <span className="badge bg-primary p-2 mt-1 ms-1 fs-5">
                  {discount.type === "percentage" ? `-${discount.value * 100}%` : `-${discount.value}€`}
                </span>
              </div>
            ) : null}
            <i className="bi bi-heart-fill text-danger" />
          </div>
          <p className="card-text">{description}</p>
          <div className="d-flex justify-content-between">
            {discount ? (
              <>
                <div className="d-flex">
                  <p className="h4 me-2">{calculateFinalPrice()}€</p>
                  <p className="text-decoration-line-through text-muted ">
                    {price}€
                  </p>
                </div>
              </>
            ) : (
              <p className="h4">{price}€</p>
            )}
            <div>
              <StarRating rating={rating} />
              <small className="text-muted">({rating})</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
