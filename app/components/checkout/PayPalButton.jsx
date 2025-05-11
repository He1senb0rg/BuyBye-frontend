import React, { useEffect, useRef } from 'react';

const PayPalButton = ({ amount }) => {
  const handleClick = () => {
    alert(`Redirecting to PayPal for payment of €${amount.toFixed(2)}... (mocked)`);
    onPay()
  };

  return (
    <div style={{ border: '1px solid #0070ba', borderRadius: '6px', padding: '12px', background: '#ffc439', cursor: 'pointer', display: 'inline-block', textAlign: 'center', maxWidth: '250px' }} onClick={handleClick}>
      <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" alt="Pay with PayPal" style={{ width: '100px' }} />
      <div style={{ fontWeight: 'bold', marginTop: '8px', color: '#003087' }}>Pagar com PayPal</div>
    </div>
  );
};

export default PayPalButton;