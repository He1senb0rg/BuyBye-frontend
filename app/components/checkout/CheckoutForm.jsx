import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext'  // Import the AuthContext
import { createOrder } from '../../services/api';

const CheckoutForm = () => {
  const { user, isAuthenticated } = useAuth(); // Destructure user and isAuthenticated from AuthContext
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card'); // Default payment method
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      setError('You must be logged in to place an order!');
      return;
    }

    const orderData = {
      userId: user._id, // Get userId directly from the user object in AuthContext
      shippingAddress,
      paymentMethod,
    };

    setIsLoading(true);

    try {
      const response = await createOrder(orderData);

      if (response.message === 'Order created successfully') {
        alert('Order placed successfully!');
        // Optionally, clear cart or redirect user
      } else {
        setError('Failed to create order: ' + response.message);
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Shipping Address</label>
          <input
            type="text"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </div>

        <div>
          <button type="button" onClick={handleCheckout} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;