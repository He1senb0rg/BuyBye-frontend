import React from 'react';
import BillingTableRow from './BillingTableRow';

const BillingTable = ({ transactions }) => (
  <div className="table-responsive table-billing-history">
    <table className="table mb-0">
      <thead>
        <tr>
          <th>ID da transação</th>
          <th>Data</th>
          <th>Montante</th>
          <th>Estado</th>
          <th>Detalhes</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <BillingTableRow key={tx._id} {...tx} />
        ))}
      </tbody>
    </table>
  </div>
);

export default BillingTable;