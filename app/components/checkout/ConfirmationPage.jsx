import React from 'react';

const ConfirmationPage = ({ formData }) => {
  const fullName = `${formData.firstName || ''} ${formData.lastName || ''}`.trim();

  return (
    <div className="text-center p-5">
      <h2 className="mb-4">✅ Payment Successful</h2>
      <p className="lead">Thank you for your purchase, {fullName || 'Valued Customer'}!</p>
      <p className="mt-3">
        We’ve received your order and will send a confirmation email to <strong>{formData.email || '[email]'}</strong>.
      </p>

      <div className="mt-4">
        <h5 className="mb-3">Order Summary</h5>
        <ul className="list-unstyled text-start d-inline-block">
          <li><strong>Payment Method:</strong> {formData.paymentMethod}</li>
          {formData.paymentMethod === 'multibanco' && (
            <>
              <li><strong>Entidade:</strong> 12345</li>
              <li><strong>Referência:</strong> {formData.mbReferencia}</li>
            </>
          )}
          {formData.paymentMethod === 'mbway' && (
            <li><strong>MB Way:</strong> {formData.mbwayPhone}</li>
          )}
          {formData.paymentMethod === 'paypal' && (
            <li><strong>PayPal Email:</strong> {formData.paypalEmail}</li>
          )}
          {formData.paymentMethod === 'ccdb' && (
            <li><strong>Cardholder:</strong> {formData.cardName}</li>
          )}
        </ul>
      </div>

      <p className="mt-4">You can close this page or continue shopping.</p>
    </div>
  );
};

export default ConfirmationPage;