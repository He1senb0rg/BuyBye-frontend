import React, { useEffect, useState } from 'react';
import AccountNavigation from '../../components/accountDetailsComponents/AccountNavigation';
import BillingTable from '../../components/accountDetailsComponents/BillingTable';
import { useAuth } from '../../contexts/AuthContext';

const BillingPage = () => {
  const { isAuthenticated } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBillingHistory = async () => {
      try {
        const response = await fetch('/api/checkout/history');
        if (!response.ok) {
          throw new Error('Erro ao buscar o histórico');
        }
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        setError('Erro ao carregar o histórico de encomendas.');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchBillingHistory();
    }
  }, [isAuthenticated]);

  return (
    <main>
      <div className="container-xl px-4 mt-4">
        <AccountNavigation activePage="billing" />
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