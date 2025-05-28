import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmationPage = ({ formData }) => {
  const fullName = `${formData.firstName || ''} ${formData.lastName || ''}`.trim();
  const navigate = useNavigate();

  const handleGoToBilling = () => {
    navigate('/account/billing');
  };

  return (
    <div className="text-center p-5">
      <h2 className="mb-4">✅ Pagamento Bem-sucedido!</h2>
      <p className="lead">Obrigado pela sua compra, {fullName || 'Cliente Valorizado'}!</p>
      <p className="mt-3">
        Recebemos a sua encomenda e enviaremos um email de confirmação para <strong>{formData.email || '[email]'}</strong>.
      </p>

      <div className="mt-4">
        <h5 className="mb-3">Resumo da Encomenda</h5>
        <ul className="list-unstyled text-start d-inline-block">
          <li><strong>Método de Pagamento:</strong> {formData.paymentMethod}</li>
          {formData.paymentMethod === 'multibanco' && (
            <>
              <li><strong>Entidade:</strong> 12345</li>
              <li><strong>Referência:</strong> {formData.mbReferencia}</li>
            </>
          )}
          {formData.paymentMethod === 'mbway' && (
            <li><strong>MB Way:</strong> {formData.mbwayPhone}</li>
          )}
          {formData.paymentMethod === 'paypal' && (
            <li><strong>Email PayPal:</strong> {formData.paypalEmail}</li>
          )}
          {formData.paymentMethod === 'ccdb' && (
            <li><strong>Nome no Cartão:</strong> {formData.cardName}</li>
          )}
        </ul>

        <hr />

        <h6 className="mt-4 mb-2">Items Comprados:</h6>
        <ul className="list-group text-start">
          {(formData.items || []).map((item, idx) => (
            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.name}</strong> <br />
                <small>Qtd: {item.quantity}</small>
              </div>
              <span>{(item.price * item.quantity).toFixed(2)}€</span>
            </li>
          ))}
          {formData.amount && (
            <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
              Total:
              <span>{formData.amount.toFixed(2)}€</span>
            </li>
          )}
        </ul>
      </div>

      <p className="mt-4">Pode fechar esta página ou continuar a comprar.</p>

      <button className="btn btn-primary mt-3" onClick={handleGoToBilling}>
        Ver Histórico de Compras
      </button>
    </div>
  );
};

export default ConfirmationPage;