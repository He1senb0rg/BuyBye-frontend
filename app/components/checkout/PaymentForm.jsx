import React from 'react';

const PaymentForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h4 className="mb-3">Pagamento</h4>
      <input name="cardNumber" type="text" placeholder="Card Number" className="form-control mb-3" onChange={handleChange} value={formData.cardNumber || ''} />
      <div className="row">
        <div className="col-md-6 mb-3">
          <input name="expiry" type="text" placeholder="MM/YY" className="form-control" onChange={handleChange} value={formData.expiry || ''} />
        </div>
        <div className="col-md-6 mb-3">
          <input name="cvv" type="text" placeholder="CVV" className="form-control" onChange={handleChange} value={formData.cvv || ''} />
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;