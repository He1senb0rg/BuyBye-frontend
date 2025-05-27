import React from 'react';
import StatusBadge from './StatusBadge'; // Assuming it's in the same directory
import DetailButton from './DetailButton'; // Make sure this is also imported

const BillingTableRow = ({ id, date, amount, status, paymentMethod }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{new Date(date).toLocaleDateString()}</td> {/* Convert date to a readable format */}
      <td>€{amount.toFixed(2)}</td> {/* Format the amount to 2 decimal places */}
      <td>
        <StatusBadge status={status} totalAmount={amount} paymentMethod={paymentMethod} />
      </td>
      <td>
        <DetailButton transactionId={id} />
      </td>
    </tr>
  );
};

export default BillingTableRow;