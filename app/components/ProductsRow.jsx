import React from "react";
import Product from "./Product";
import { useAuth } from "../contexts/AuthContext";

const ProductsRow = ({ products, title, error, loading }) => {
  const { user } = useAuth();
  const isAdmin = user && user.role === "admin";
  return (
    <div className="container border-bottom pb-3">
      <div className="d-flex align-items-center">
        <p className="h1">{title}</p>
        {isAdmin && (<a href="/product/create" className="text-decoration-none">
          <button className="btn btn-primary ms-2 my-2 py-0">
            <i className="bi bi-plus fs-4"></i>
          </button>
        </a>)}
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {error && <p>{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map((product, index) => (
            <Product
              key={"product" + index}
              name={product.name}
              description={product.description}
              price={product.price}
              images={product.images}
              rating={product.averageRating}
              discount={product.discount}
              link={`product/${product._id}`}
            />
          ))
        )}
      </div>
      <div className="row">
        <div className="col text-center">
          <a href="#" className="btn btn-primary my-2">
            Ver Mais Produtos
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductsRow;
