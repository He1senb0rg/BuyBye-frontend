import React, { useEffect, useState } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { updateUser } from '../../services/api';
import toast from "react-hot-toast";

const AccountDetailsCard = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  useEffect(() => {
    if (user) {
      const fullName = user.name || '';
      const firstSpaceIndex = fullName.indexOf(' ');
      const firstName = firstSpaceIndex !== -1 ? fullName.substring(0, firstSpaceIndex) : fullName;
      const lastName = firstSpaceIndex !== -1 ? fullName.substring(firstSpaceIndex + 1) : '';

      setFormData({
        email: user.email || '',
        firstName,
        lastName,
        phone: user.phone ?? ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user?.id) {
    console.error("User ID:", user?.id);
    return toast.error("ID do utilizador não encontrado.");
  }

  const fullName = `${formData.firstName} ${formData.lastName}`.trim();

  const updatedUserData = {
    email: formData.email,
    phone: formData.phone,
    name: fullName,
  };

  console.log("Submitting updated user data:", updatedUserData);

  try {
    const result = await updateUser(user.id, updatedUserData);
    console.log("API result:", result);

      if (result.error) {
    toast.error(result.error);
  } else {
    toast.success("Informações atualizadas com sucesso!");

    const normalizedUser = {
      ...result.user,
      id: result.user._id,
      phone: result.user.phone ?? '',
    };

  setUser?.(normalizedUser);
  localStorage.setItem("user", JSON.stringify(normalizedUser));
}

  } catch (err) {
    console.error("Erro ao atualizar:", err);
    toast.error("Erro ao atualizar os dados.");
  }
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