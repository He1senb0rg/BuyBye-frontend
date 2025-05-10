import React, { useEffect, useState } from 'react';
import { useAuth } from "../../contexts/AuthContext";

const AccountDetailsCard = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted user info:", formData);
    // Optional: implement update logic here (e.g., call API)
  };

  return (
    <div className="card mb-3">
      <div className="card-header">Detalhes de Conta</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              id="inputEmailAddress"
              name="email"
              className="form-control"
              placeholder="Insira o seu e-mail"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="inputEmailAddress">Enderenço E-mail</label>
          </div>

          <div className="row mb-3">
            <div className="col">
              <div className="form-floating">
                <input
                  type="text"
                  id="inputFirstName"
                  name="firstName"
                  className="form-control"
                  placeholder="Insira o seu nome"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <label htmlFor="inputFirstName">Nome</label>
              </div>
            </div>
            <div className="col">
              <div className="form-floating">
                <input
                  type="text"
                  id="inputLastName"
                  name="lastName"
                  className="form-control"
                  placeholder="Insira o seu apelido"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <label htmlFor="inputLastName">Apelido</label>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <div className="form-floating">
                <input
                  type="tel"
                  id="inputPhone"
                  name="phone"
                  className="form-control"
                  placeholder="Insira o seu número de telefone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <label htmlFor="inputPhone">Número de Telefone</label>
              </div>
            </div>
          </div>

          <button className="btn btn-primary" type="submit">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountDetailsCard;