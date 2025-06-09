import React from 'react';

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

  return (
    <div className="d-flex justify-content-between align-items-center">
      <span className={`badge ${badgeClass} p-2`}>
        {statusText}
      </span>
      {status === 'paid' && (
        <div className="ms-3">
          <small>
            <strong>Total:</strong> €{totalAmount.toFixed(2)} | <strong>Método:</strong> {paymentMethod}
          </small>
        </div>
      )}
    </div>
  );
};

export default StatusBadge;