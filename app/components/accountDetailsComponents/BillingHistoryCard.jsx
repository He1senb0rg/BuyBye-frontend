import React from 'react';

const BillingHistoryCard = ({ children }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">Billing History</div>
      <div className="card-body p-0">{children}</div>
    </div>
  );
};

export default BillingHistoryCard;
