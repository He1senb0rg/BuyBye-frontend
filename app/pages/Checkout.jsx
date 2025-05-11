import React, { useState } from 'react';
import BillingForm from '../components/checkout/BillingForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderSummary from '../components/checkout/OrderSummary';
import ConfirmationPage from '../components/checkout/ConfirmationPage';
import { useAuth } from '../contexts/AuthContext';
import { createOrder } from '../services/api';

const Checkout = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ delivery: 'standard' });
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleTotalChange = (total) => {
    setFormData((prev) => ({ ...prev, amount: total }));
  };

  const handleCheckout = async () => {
    const orderData = {
      userId: user._id,
      shippingAddress: formData.address,
      paymentMethod: formData.paymentMethod,
      items: formData.items || [],
      amount: formData.amount || 0,
    };

    setIsLoading(true);
    setError('');

    try {
      const response = await createOrder(orderData);

      if (response.message === 'Order created successfully') {
        setOrderPlaced(true);
      } else {
        setError('Failed to create order: ' + response.message);
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }

    setIsLoading(false);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <BillingForm formData={formData} setFormData={setFormData} />;
      case 1:
        return <PaymentForm formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  if (orderPlaced) {
    return <ConfirmationPage formData={formData} />;
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-7 mb-4">
          {renderStep()}
          {error && <p className="text-danger mt-3">{error}</p>}
          <div className="d-flex justify-content-between mt-4">
            {step > 0 && (
              <button className="btn btn-outline-secondary" onClick={handleBack}>
                Back
              </button>
            )}
            {step === 0 && (
              <button className="btn btn-primary ms-auto" onClick={handleNext}>
                Next
              </button>
            )}
            {step === 1 && (
              <button
                className="btn btn-success ms-auto"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? 'A processar...' : 'Confirmar'}
              </button>
            )}
          </div>
        </div>
        <div className="col-md-5">
          <OrderSummary onTotalChange={handleTotalChange} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;