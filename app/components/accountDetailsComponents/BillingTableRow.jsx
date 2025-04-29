import React from 'react';
import StatusBadge from './StatusBadge';
import DetailButton from './DetailButton';

const BillingTableRow = ({ id, date, amount, status }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{date}</td>
      <td>{amount}</td>
      <td><StatusBadge status={status} /></td>
      <td><DetailButton /></td>
    </tr>
  );
};

export default BillingTableRow;