import React from 'react';

const BillingForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card bg-body-tertiary p-3">
      <h4 className="mb-3">Endereço de Faturação</h4>
      <form>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="form-floating">
              <input
                id="billingFirstName"
                name="firstName"
                type="text"
                className="form-control"
                placeholder="Nome"
                value={formData.firstName || ''}
                onChange={handleChange}
                required
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
                placeholder="Apelido"
                value={formData.lastName || ''}
                onChange={handleChange}
                required
              />
              <label htmlFor="billingLastName">Apelido</label>
            </div>
          </div>
        </div>

        <div className="form-floating mb-3">
          <input
            id="billingPhoneNumber"
            name="phoneNumber"
            type="tel"
            className="form-control"
            placeholder="Número de Telefone"
            value={formData.phoneNumber || ''}
            onChange={handleChange}
            required
          />
          <label htmlFor="billingPhoneNumber">Número de Telefone</label>
        </div>

        <div className="form-floating mb-3">
          <input
            id="billingAddress"
            name="address"
            type="text"
            className="form-control"
            placeholder="Morada"
            value={formData.address || ''}
            onChange={handleChange}
            required
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
                placeholder="Cidade"
                value={formData.city || ''}
                onChange={handleChange}
                required
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
                placeholder="Distrito"
                value={formData.state || ''}
                onChange={handleChange}
                required
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
                placeholder="Código Postal"
                value={formData.zip || ''}
                onChange={handleChange}
                required
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