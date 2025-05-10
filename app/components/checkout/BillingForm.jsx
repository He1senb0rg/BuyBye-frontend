import React from 'react';

const BillingForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card">
      <h4 className="mb-3">Endereço de Faturamento</h4>
      <input name="email" type="email" placeholder="Email" className="form-control mb-3" onChange={handleChange} value={formData.email || ''} />
      <div className="row">
        <div className="col-md-6 mb-3">
          <input name="firstName" type="text" placeholder="First name" className="form-control" onChange={handleChange} value={formData.firstName || ''} />
        </div>
        <div className="col-md-6 mb-3">
          <input name="lastName" type="text" placeholder="Last name" className="form-control" onChange={handleChange} value={formData.lastName || ''} />
        </div>
      </div>
      <input name="address" type="text" placeholder="Address" className="form-control mb-3" onChange={handleChange} value={formData.address || ''} />
      <div className="row">
        <div className="col-md-6 mb-3">
          <input name="city" type="text" placeholder="City" className="form-control" onChange={handleChange} value={formData.city || ''} />
        </div>
        <div className="col-md-3 mb-3">
          <input name="state" type="text" placeholder="State" className="form-control" onChange={handleChange} value={formData.state || ''} />
        </div>
        <div className="col-md-3 mb-3">
          <input name="zip" type="text" placeholder="ZIP" className="form-control" onChange={handleChange} value={formData.zip || ''} />
        </div>
      </div>
    </div>
  );
};

export default BillingForm;