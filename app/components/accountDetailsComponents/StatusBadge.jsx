import React from 'react';

// Payment method translation map
const paymentMethodTranslations = {
  multibanco: 'Multibanco',
  mbway: 'MB Way',
  paypal: 'PayPal',
  ccdb: 'Cartão de Crédito/Débito',
};

const StatusBadge = ({ status, totalAmount, paymentMethod }) => {
  let badgeClass = '';
  let statusText = '';

  switch (status) {
    case 'pending':
      badgeClass = 'bg-warning text-dark';
      statusText = 'Aguardando pagamento';
      break;
    case 'paid':
      badgeClass = 'bg-success';
      statusText = 'Pagamento confirmado';
      break;
    case 'shipped':
      badgeClass = 'bg-info text-dark';
      statusText = 'Enviado';
      break;
    case 'delivered':
      badgeClass = 'bg-primary';
      statusText = 'Entregue';
      break;
    default:
      badgeClass = 'bg-secondary';
      statusText = 'Status desconhecido';
  }

  // Translate payment method
  const translatedPaymentMethod = paymentMethodTranslations[paymentMethod] || paymentMethod;

  return (
    <div className="d-flex justify-content-between align-items-center">
      <span className={`badge ${badgeClass} p-2`}>
        {statusText}
      </span>
      {status === 'paid' && (
        <div className="ms-3">
          <small>
            <strong>Total:</strong> €{totalAmount.toFixed(2)} | <strong>Método:</strong> {translatedPaymentMethod}
          </small>
        </div>
      )}
    </div>
  );
};

export default StatusBadge;