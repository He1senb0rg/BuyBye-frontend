import React from 'react';

const ChangePasswordCard = () => {
  return (
    <div className="card mb-4">
      <div className="card-header">Mudar de Palavra-passe</div>
      <div className="card-body">
        <form>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="currentPassword" placeholder="Password atual" />
            <label htmlFor="currentPassword">Palavra-passe</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="newPassword" placeholder="Nova password" />
            <label htmlFor="newPassword">Nova Palavra-passe</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="confirmPassword" placeholder="Confirmar nova password" />
            <label htmlFor="confirmPassword">Confirmar Palavra-passe Nova</label>
          </div>
          <button className="btn btn-primary" type="submit">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordCard;
