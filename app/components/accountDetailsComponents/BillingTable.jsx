import React from 'react';
import BillingTableRow from './BillingTableRow';

const BillingTable = ({ transactions }) => {
  return (
    <div className="table-responsive table-billing-history">
      <table className="table mb-0">
        <thead>
          <tr>
            <th className="border-gray-200">ID da transação</th>
            <th className="border-gray-200">Data</th>
            <th className="border-gray-200">Quantidade</th>
            <th className="border-gray-200">Estado</th>
            <th className="border-gray-200">Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <BillingTableRow key={tx.id} {...tx} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingTable;