import React from 'react';

const StatusBadge = ({ status, totalAmount, paymentMethod }) => {
  let badgeClass = '';
  let statusText = '';

  switch (status) {
    case 'pending':
      badgeClass = 'badge-warning'; // Yellow for pending
      statusText = 'Aguardando pagamento';
      break;
    case 'paid':
      badgeClass = 'badge-success'; // Green for paid
      statusText = 'Pagamento confirmado';
      break;
    case 'shipped':
      badgeClass = 'badge-info'; // Blue for shipped
      statusText = 'Enviado';
      break;
    case 'delivered':
      badgeClass = 'badge-primary'; // Blue for delivered
      statusText = 'Entregue';
      break;
    default:
      badgeClass = 'badge-secondary'; // Default gray for unknown status
      statusText = 'Status desconhecido';
  }

  return (
    <div className="d-flex justify-content-between align-items-center">
      <span className={`badge ${badgeClass} p-2`}>
        {statusText}
      </span>
      {/* Optional details */}
      {status === 'paid' && (
        <div className="ms-3">
          <small>
            <strong>Total:</strong> €{totalAmount} | <strong>Método de pagamento:</strong> {paymentMethod}
          </small>
        </div>
      )}
    </div>
  );
};

export default StatusBadge;