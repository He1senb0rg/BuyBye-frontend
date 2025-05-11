import React, { useEffect, useRef, useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const generateMultibancoReference = () => {
  const entidade = '12345';
  const referencia = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
  return {
    entidade,
    referencia: referencia.replace(/(\d{3})(?=\d)/g, '$1 '),
  };
};

const PayPalButton = ({ amount }) => {
  const paypalRef = useRef();

  useEffect(() => {
    if (!window.paypal) return;

    window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'paypal',
      },
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount.toFixed(2),
            },
          }],
        });
      },
      onApprove: async (data, actions) => {
        const details = await actions.order.capture();
        alert(`Pagamento concluído por ${details.payer.name.given_name}`);
        // Handle confirmation or pass to backend here
      },
      onError: (err) => {
        console.error('PayPal Checkout Error:', err);
      },
    }).render(paypalRef.current);
  }, [amount]);

  return <div ref={paypalRef} />;
};

const PaymentForm = ({ formData, setFormData }) => {
  const [mbData, setMbData] = useState({ entidade: '', referencia: '' });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=EUR';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (e) => {
    setFormData((prev) => ({ ...prev, focus: e.target.name }));
  };

  useEffect(() => {
    if (formData.paymentMethod === 'multibanco') {
      setMbData(generateMultibancoReference());
    }
  }, [formData.paymentMethod]);

  return (
    <div>
      <h4 className="mb-3">Pagamento</h4>

      {/* Payment Method */}
      <div className="form-floating mb-3">
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

      {/* Card Payment */}
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

      {/* PayPal Button */}
      {formData.paymentMethod === 'paypal' && (
        <div className="mt-3">
          <PayPalButton amount={parseFloat(formData.amount) || 0} />
        </div>
      )}

      {/* MB Way */}
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

      {/* Multibanco */}
      {formData.paymentMethod === 'multibanco' && (
        <div className="alert alert-info mt-3">
          <p><strong>Entidade:</strong> {mbData.entidade}</p>
          <p><strong>Referência:</strong> {mbData.referencia}</p>
          <p><strong>Montante:</strong> {(formData.amount || 'XX.XX')} €</p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;