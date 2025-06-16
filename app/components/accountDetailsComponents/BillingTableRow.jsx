import React from 'react';
import StatusBadge from './StatusBadge';
import DetailButton from './DetailButton';

const BillingTableRow = ({ _id, createdAt, totalAmount, orderStatus, paymentMethod, items }) => {
  const transaction = { _id, createdAt, totalAmount, orderStatus, paymentMethod, items };

  return (
    <tr>
      <td>{_id.slice(0, 8)}...</td>
      <td>{new Date(createdAt).toLocaleDateString('pt-PT')}</td>
      <td>€{totalAmount.toFixed(2)}</td>
      <td>
        <StatusBadge
          status={orderStatus}
          totalAmount={totalAmount}
          paymentMethod={paymentMethod}
        />
      </td>
      <td>
        <DetailButton transaction={transaction} />
      </td>
    </tr>
  );
};

export default BillingTableRow;