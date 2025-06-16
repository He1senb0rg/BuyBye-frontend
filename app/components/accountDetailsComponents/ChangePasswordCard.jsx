import React, { useState } from 'react';
import { changePassword } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const ChangePasswordCard = () => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!user?.id) {
      console.log("User ID:", user?.id);
      return setError("ID do utilizador não encontrado.");
    }

    if (newPassword !== confirmPassword) {
      return setError("As novas palavras-passe não coincidem.");
    }

    try {
      setLoading(true);
      const res = await changePassword(user.id, currentPassword, newPassword);

      if (res.error) {
        setError(res.error);
      } else {
        setMessage("Palavra-passe alterada com sucesso.");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setError("Ocorreu um erro ao mudar a palavra-passe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">Mudar de Palavra-passe</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="currentPassword"
              placeholder="Password atual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <label htmlFor="currentPassword">Palavra-passe Atual</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="Nova password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <label htmlFor="newPassword">Nova Palavra-passe</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirmar nova password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label htmlFor="confirmPassword">Confirmar Palavra-passe Nova</label>
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "A guardar..." : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordCard;