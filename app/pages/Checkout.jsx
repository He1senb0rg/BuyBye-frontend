import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BillingForm from '../components/checkout/BillingForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderSummary from '../components/checkout/OrderSummary';
import ConfirmationPage from '../components/checkout/ConfirmationPage';
import { useAuth } from '../contexts/AuthContext';
import { createOrder, getCart } from '../services/api';

const Checkout = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ delivery: 'standard', items: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { user } = useAuth();

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleTotalChange = (total) => {
    setFormData((prev) => ({ ...prev, amount: total }));
  };

const handleCheckout = async () => {
  const {
    address,
    city,
    state,
    zip,
    firstName,
    lastName,
    email,
    paymentMethod,
    items,
    amount,
  } = formData;

  const shippingAddress = { address, city, state, zip };

  if (!address || !city || !state || !zip || !paymentMethod || !items?.length) {
    setError('Por favor preencha todos os campos antes de confirmar.');
    return;
  }

  const orderData = {
    userId: user._id,
    shippingAddress,
    paymentMethod,
    items,
    amount,
    customer: {
      firstName,
      lastName,
      email,
    },
  };

  setIsLoading(true);
  setError('');

  try {
    const response = await createOrder(orderData);
    console.log('Order response:', response);

    const isSuccess =
      response?.success === true ||
      response?.status === 200 ||
      /sucesso|successfully/i.test(response?.message);

    if (isSuccess) {
      setOrderPlaced(true);
    } else {
      setError('A criação do pedido falhou: ' + (response.message || 'Erro desconhecido.'));
    }
  } catch (err) {
    setError('Erro: ' + err.message);
  }

  setIsLoading(false);
};


  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cart = await getCart();
        setFormData((prev) => ({
          ...prev,
          items: cart.items || [],
        }));
      } catch (err) {
        console.error('Erro ao obter o carrinho:', err);
      }
    };

    if (user) {
      fetchCartItems();
    }
  }, [user]);

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

  const isBillingFormComplete = () => {
  const { firstName, lastName, email, address, city, state, zip } = formData;
  return firstName && lastName && email && address && city && state && zip;
};

const isPaymentFormComplete = () => {
  if (formData.paymentMethod === 'ccdb') {
    return (
      formData.cardName &&
      /^\d{16}$/.test(formData.cardNumber) && // Exactly 16 digits
      /^\d{2}\/\d{2}$/.test(formData.expiry) && // Simple MM/YY format
      /^\d{3,4}$/.test(formData.cvv) // 3 or 4 digits
    );
  } else if (formData.paymentMethod === 'paypal') {
    return true; // Assuming PayPal button handles its own validation
  } else if (formData.paymentMethod === 'mbway') {
    return /^\d{9}$/.test(formData.mbwayPhone); // Valid 9-digit phone number
  } else if (formData.paymentMethod === 'multibanco') {
    return true; // No extra input required
  }
  return false;
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
                Voltar
              </button>
            )}
            
            {step === 0 && (
              <button
                className="btn btn-primary ms-auto"
                onClick={handleNext}
                disabled={!isBillingFormComplete()} // Disable if incomplete
              >
                Próximo
              </button>
            )}

            {step === 1 && (
              <button
                className="btn btn-success ms-auto"
                onClick={handleCheckout}
                disabled={!isPaymentFormComplete() || isLoading} // Disable if incomplete
              >
                {isLoading ? 'A processar...' : 'Confirmar'}
              </button>
            )}
          </div>

        </div>
        <div className="col-md-5">
          <OrderSummary items={formData.items || []} onTotalChange={handleTotalChange} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;