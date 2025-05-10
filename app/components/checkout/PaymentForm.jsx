import React from 'react';

const PaymentForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
          <option value="paypal">PayPal</option>
          <option value="multibanco">Multibanco</option>
          <option value="mbway">MB Way</option>
        </select>
        <label htmlFor="paymentMethod">Método de Pagamento</label>
      </div>

      {/* Card Number */}
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="cardNumber"
          name="cardNumber"
          placeholder="Número do Cartão"
          value={formData.cardNumber || ''}
          onChange={handleChange}
        />
        <label htmlFor="cardNumber">Número do Cartão</label>
      </div>

      <div className="row">
        {/* Expiry */}
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
            />
            <label htmlFor="expiry">Validade (MM/AA)</label>
          </div>
        </div>

        {/* CVV */}
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
            />
            <label htmlFor="cvv">CVV</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;