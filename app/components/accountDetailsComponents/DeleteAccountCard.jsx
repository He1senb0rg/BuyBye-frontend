import React from 'react';

const DeleteAccountCard = () => {
  return (
    <div className="card mb-4">
      <div className="card-header">Apagar Conta</div>
      <div className="card-body">
        <p>
          A eliminação da sua conta é uma ação permanente e não pode ser anulada.
          Se tiver a certeza de que pretende apagar a sua conta, selecione o botão abaixo.
        </p>
        <button className="btn btn-danger-soft text-danger" type="button">
          Eu percebi, apaguem a minha conta
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountCard;
