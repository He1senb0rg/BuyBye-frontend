import React, { useEffect, useState } from 'react';
import AccountNavigation from '../../components/accountDetailsComponents/AccountNavigation';
import BillingTable from '../../components/accountDetailsComponents/BillingTable';
import { useAuth } from '../../contexts/AuthContext';
import { fetchBillingHistory } from '../../services/api';

const BillingPage = () => {
  const { isAuthenticated } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBillingHistory = async () => {
      try {
        const data = await fetchBillingHistory();
        setTransactions(data);
      } catch (err) {
        console.error("Billing fetch error:", err);
        setError('Erro ao carregar o histórico de encomendas.');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      loadBillingHistory();
    }
  }, [isAuthenticated]);

  return (
    <main>
      <div className="container-xl px-4 mt-4">
        <AccountNavigation />
        <hr className="mt-0 mb-3" />
        <div className="card mb-4">
          <div className="card-header">Histórico de Encomendas</div>
          <div className="card-body">
            {loading ? (
              <p>A carregar...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : transactions.length ? (
              <BillingTable transactions={transactions} />
            ) : (
              <p>Não há encomendas para mostrar.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BillingPage;