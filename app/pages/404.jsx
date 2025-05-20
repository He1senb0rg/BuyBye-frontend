import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const NotFound = () => {
  const { user } = useAuth();

  return (
    <main className="container text-center py-5">
      <img
        src="/assets/images/BuyByeLogo.png"
        alt="Logo BuyBye"
        className="img-fluid w-50 mb-4"
      />
      <h1 className="display-4">404 - Página Não Encontrada</h1>
      <p className="lead">A página que procuras não existe.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Voltar à Página Inicial
      </Link>
      {user && (
        <div className="mt-3">
          <Link to="/admin/dashboard" className="btn btn-secondary">
            Ir para o Painel de Controlo
          </Link>
        </div>
      )}
    </main>
  );
};

export default NotFound;
