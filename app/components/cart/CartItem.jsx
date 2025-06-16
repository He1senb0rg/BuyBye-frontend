import React from "react";
import { useCart } from "../../contexts/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { product, quantity } = item;

  if (!product) return null;

  const hasActiveDiscount = (discount) => {
    if (!discount) return false;

    const now = new Date();
    const start = discount.start_date ? new Date(discount.start_date) : null;
    const end = discount.end_date ? new Date(discount.end_date) : null;

    return (!start || now >= start) && (!end || now <= end);
  };

  const calculateDiscountedPrice = () => {
    if (hasActiveDiscount(product.discount)) {
      const { type, value } = product.discount;

      if (type === "percentage") {
        return Math.max(0, product.price * (1 - value));
      } else if (type === "fixed") {
        return Math.max(0, product.price - value);
      }
    }
    return product.price;
  };

  const pricePerUnit = calculateDiscountedPrice();
  const totalPrice = (pricePerUnit * quantity).toFixed(2);
  const discountActive = hasActiveDiscount(product.discount);

  return (
    <tr>
      <td>{product.name}</td>
      <td>
        {discountActive ? (
          <>
            <span className="badge bg-success me-1">
              {product.discount.type === "percentage"
                ? `${(product.discount.value * 100).toFixed(0)}% OFF`
                : `-€${product.discount.value.toFixed(2)}`}
            </span>
            <span className="fw-bold text-success">{pricePerUnit.toFixed(2)}€</span>{" "}
            <span className="text-muted text-decoration-line-through">
              {product.price.toFixed(2)}€
            </span>
          </>
        ) : (
          <span>{product.price.toFixed(2)}€</span>
        )}
      </td>
      <td>
        <input
          type="number"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={(e) => {
            const newQuantity = parseInt(e.target.value, 10);
            if (newQuantity > 0 && newQuantity <= product.stock) {
              updateQuantity(product._id, newQuantity);
            }
          }}
          className="form-control"
        />
      </td>
      <td>{totalPrice}€</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => removeFromCart(product._id)}
        >
          Remover
        </button>
      </td>
    </tr>
  );
};

export default CartItem;