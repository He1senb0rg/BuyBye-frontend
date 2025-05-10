import React from 'react';

const BillingForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card bg-body-tertiary p-3">
      <h4 className="mb-3">Endereço de Faturamento</h4>
      <form>
        <div className="form-floating mb-3">
          <input
            id="billingEmail"
            name="email"
            type="email"
            className="form-control"
            placeholder="Email"
            value={formData.email || ''}
            onChange={handleChange}
          />
          <label htmlFor="billingEmail">Endereço E-mail</label>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="form-floating">
              <input
                id="billingFirstName"
                name="firstName"
                type="text"
                className="form-control"
                placeholder="First name"
                value={formData.firstName || ''}
                onChange={handleChange}
              />
              <label htmlFor="billingFirstName">Nome</label>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-floating">
              <input
                id="billingLastName"
                name="lastName"
                type="text"
                className="form-control"
                placeholder="Last name"
                value={formData.lastName || ''}
                onChange={handleChange}
              />
              <label htmlFor="billingLastName">Apelido</label>
            </div>
          </div>
        </div>

        <div className="form-floating mb-3">
          <input
            id="billingAddress"
            name="address"
            type="text"
            className="form-control"
            placeholder="Address"
            value={formData.address || ''}
            onChange={handleChange}
          />
          <label htmlFor="billingAddress">Morada</label>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="form-floating">
              <input
                id="billingCity"
                name="city"
                type="text"
                className="form-control"
                placeholder="City"
                value={formData.city || ''}
                onChange={handleChange}
              />
              <label htmlFor="billingCity">Cidade</label>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="form-floating">
              <input
                id="billingState"
                name="state"
                type="text"
                className="form-control"
                placeholder="State"
                value={formData.state || ''}
                onChange={handleChange}
              />
              <label htmlFor="billingState">Distrito</label>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="form-floating">
              <input
                id="billingZip"
                name="zip"
                type="text"
                className="form-control"
                placeholder="ZIP"
                value={formData.zip || ''}
                onChange={handleChange}
              />
              <label htmlFor="billingZip">Código Postal</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BillingForm;