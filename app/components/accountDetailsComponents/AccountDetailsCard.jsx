import React from 'react';
import { useAuth } from "../../contexts/AuthContext"

const AccountDetailsCard = () => {
    const { user } = useAuth();
  return (
    <div className="card mb-3">
      <div className="card-header">Detalhes de Conta</div>
      <div className="card-body">
        <form>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="inputEmailAddress" placeholder="Insira o seu e-mail" />
            <label htmlFor="inputEmailAddress">Enderenço E-mail</label>
          </div>
          <div className="row mb-3">
            <div className="col">
              <div className="form-floating">
                <input type="text" className="form-control" id="inputFirstName" placeholder="Insira o seu nome" />
                <label htmlFor="inputFirstName">Nome</label>
              </div>
            </div>
            <div className="col">
              <div className="form-floating">
                <input type="text" className="form-control" id="inputLastName" placeholder="Insira o seu apelido" />
                <label htmlFor="inputLastName">Apelido</label>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <div className="form-floating">
                <input type="tel" className="form-control" id="inputPhone" placeholder="Insira o seu número de telefone" />
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
