import React from 'react';
import AccountNavigation from '../../components/accountDetailsComponents/AccountNavigation';

const BillingPage = () => {
  return (
    <main>
      <div className="container-xl px-4 mt-4">
        <AccountNavigation activePage="billing" />
        <hr className="mt-0 mb-3" />
        <div className="card mb-4">
          <div className="card-header">Histórico de Encomendas</div>
          <div className="card-body">
            <p>Lista de encomendas será aqui exibida.</p>
            {/* You can replace this with a <BillingHistoryTable /> later */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BillingPage;
