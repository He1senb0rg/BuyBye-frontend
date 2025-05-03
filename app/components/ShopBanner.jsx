import React from "react";

const ShopBanner = ({title, description, link, buttonText}) => {
  return (
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light">{title}</h1>
          <p className="lead text-body-secondary">
            {description}
          </p>
          <p>
            <a href={link} className="btn btn-primary my-2">
              {buttonText}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
export default ShopBanner;
