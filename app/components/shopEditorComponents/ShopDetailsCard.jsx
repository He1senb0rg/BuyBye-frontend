import React, { useState } from 'react';

const ShopDetailsCard = () => {
  const [descricao, setDescricao] = useState('');
  return (
    <div className="card mb-3">
      <div className="card-header">Detalhes de Loja</div>
      <div className="card-body">
        <form>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="inputUser" placeholder=" da Loja" />
            <label htmlFor="inputUser">Nome da Loja</label>
          </div>
          <div className="row mb-3">
            <div className="col">
              <div className="form-floating">
                <input type="text" className="form-control" id="inputFirstName" placeholder="Insira o seu nome" />
                <label htmlFor="inputFirstName">Nome do Dono</label>
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
            <div className="col">
              <div className="form-floating">
                <input type="email" className="form-control" id="inputEmailAddress" placeholder="Insira o seu e-mail" />
                <label htmlFor="inputEmailAddress">Enderenço E-mail</label>
              </div>
            </div>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="inputAddress" maxLength={100} placeholder="Insira o seu endereço" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            <label htmlFor="inputAddress">Descrição da Loja</label>
            <div className="form-text text-end">
              {descricao.length} / 100
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <button className="btn btn-primary" type="submit">
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopDetailsCard;
