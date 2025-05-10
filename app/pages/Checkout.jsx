import React, { useState } from 'react';
import BillingForm from '../components/checkout/BillingForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderSummary from '../components/checkout/OrderSummary';

const Checkout = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ delivery: 'standard' });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const renderStep = () => {
    switch (step) {
      case 0: return <BillingForm formData={formData} setFormData={setFormData} />;
      case 1: return <PaymentForm formData={formData} setFormData={setFormData} />;
      default: return null;
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-7 mb-4">
          {renderStep()}
          <div className="d-flex justify-content-between mt-4">
            {step > 0 && <button className="btn btn-outline-secondary" onClick={handleBack}>Back</button>}
            {step < 1 && <button className="btn btn-primary ms-auto" onClick={handleNext}>Next</button>}
          </div>
        </div>
        <div className="col-md-5">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;