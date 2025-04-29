import React from 'react';

const TwoFactorAuthCard = () => {
  return (
    <div className="card mb-4">
      <div className="card-header">Two-Factor Authentication</div>
      <div className="card-body">
        <p>
          Adicione outro nível de segurança à sua conta activando a autenticação de dois factores.
          Enviar-lhe-emos uma SMS para verificar as suas tentativas de início de sessão em dispositivos e browsers não reconhecidos.
        </p>
        <form>
          <div className="form-check">
            <input className="form-check-input" id="twoFactorOn" type="radio" name="twoFactor" defaultChecked />
            <label className="form-check-label" htmlFor="twoFactorOn">On</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" id="twoFactorOff" type="radio" name="twoFactor" />
            <label className="form-check-label" htmlFor="twoFactorOff">Off</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TwoFactorAuthCard;
