import React from 'react';

const PayPalButton = ({ amount }) => {
  const handleClick = () => {
    alert(`Pagamento simulado concluído! ${amount.toFixed(2)}€ pago via PayPal.`);
  };

  return (
    <button
      type="button"
      className="btn btn-warning d-flex align-items-center gap-2 px-4 py-2 rounded-3 shadow-sm"
      onClick={handleClick}
      style={{ border: '1px solid #ffc107', maxWidth: '260px' }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/196/196566.png"
        alt="PayPal Logo"
        style={{ width: '28px', height: '28px', objectFit: 'contain' }}
      />
      <span className="fw-semibold text-primary">Pagar com PayPal</span>
    </button>
  );
};

export default PayPalButton;