import React from 'react';
import { Button } from 'react-bootstrap';

const WishlistRow = ({ item }) => {
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <div className="img-product">
            <img src={item.imageUrl} alt={item.name} className="img-fluid" width="60" />
          </div>
          <div className="name-product ms-3">{item.name}</div>
        </div>
      </td>
      <td>${item.price.toFixed(2)}</td>
      <td>
        {item.inStock ? (
          <span className="badge bg-success">In Stock</span>
        ) : (
          <span className="badge bg-danger">Out of Stock</span>
        )}
      </td>
      <td>
        <Button variant="primary" disabled={!item.inStock}>Add to Cart</Button>
      </td>
      <td className="text-center">
        <Button variant="danger">
          <i className="far fa-trash-alt"></i> Remove
        </Button>
      </td>
    </tr>
  );
};

export default WishlistRow;