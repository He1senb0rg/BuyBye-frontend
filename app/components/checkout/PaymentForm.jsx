import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import PayPalButton from './PayPalButton';

const generateMultibancoReference = () => {
  const entidade = '12345';
  const referencia = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
  return {
    entidade,
    referencia: referencia.replace(/(\d{3})(?=\d)/g, '$1 '),
  };
};

const PaymentForm = ({ formData, setFormData }) => {
  const [mbData, setMbData] = useState({ entidade: '', referencia: '' });

  useEffect(() => {
    if (formData.paymentMethod === 'multibanco') {
      const generated = generateMultibancoReference();
      setMbData(generated);
      setFormData((prev) => ({
        ...prev,
        mbReferencia: generated.referencia,
      }));
    }
  }, [formData.paymentMethod, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (e) => {
    setFormData((prev) => ({ ...prev, focus: e.target.name }));
  };

  return (
    <div>
      <h4 className="mb-4">Pagamento</h4>

      <div className="form-floating mb-4">
        <select
          className="form-select"
          id="paymentMethod"
          name="paymentMethod"
          value={formData.paymentMethod || ''}
          onChange={handleChange}
        >
          <option value="">Selecione o método de pagamento</option>
          <option value="ccdb">Cartão de Crédito/Débito</option>
          <option value="paypal">PayPal</option>
          <option value="multibanco">Multibanco</option>
          <option value="mbway">MB Way</option>
        </select>
        <label htmlFor="paymentMethod">Método de Pagamento</label>
      </div>

      {formData.paymentMethod === 'ccdb' && (
        <>
          <div className="mb-4">
            <Cards
              number={formData.cardNumber || ''}
              name={formData.cardName || ''}
              expiry={formData.expiry || ''}
              cvc={formData.cvv || ''}
              focused={formData.focus || ''}
            />
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="cardName"
              name="cardName"
              placeholder="Nome no Cartão"
              value={formData.cardName || ''}
              onChange={handleChange}
              onFocus={handleFocus}
            />
            <label htmlFor="cardName">Nome no Cartão</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="cardNumber"
              name="cardNumber"
              placeholder="Número do Cartão"
              value={formData.cardNumber || ''}
              onChange={handleChange}
              onFocus={handleFocus}
            />
            <label htmlFor="cardNumber">Número do Cartão</label>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="expiry"
                  name="expiry"
                  placeholder="MM/AA"
                  value={formData.expiry || ''}
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
                <label htmlFor="expiry">Validade (MM/AA)</label>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="cvv"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv || ''}
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
                <label htmlFor="cvv">CVV</label>
              </div>
            </div>
          </div>
        </>
      )}

      {formData.paymentMethod === 'paypal' && (
        <div className="mt-3">
          <PayPalButton amount={parseFloat(formData.amount) || 0} />
        </div>
      )}

      {formData.paymentMethod === 'mbway' && (
        <div className="form-floating mb-3">
          <input
            type="tel"
            className="form-control"
            id="mbwayPhone"
            name="mbwayPhone"
            placeholder="Número de Telefone MB Way"
            value={formData.mbwayPhone || ''}
            onChange={handleChange}
          />
          <label htmlFor="mbwayPhone">Telefone MB Way</label>
        </div>
      )}

      {formData.paymentMethod === 'multibanco' && (
        <div className="alert alert-info mt-3">
          <p><strong>Entidade:</strong> {mbData.entidade}</p>
          <p><strong>Referência:</strong> {mbData.referencia}</p>
          <p><strong>Montante:</strong> {formData.amount || 'XX.XX'} €</p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;