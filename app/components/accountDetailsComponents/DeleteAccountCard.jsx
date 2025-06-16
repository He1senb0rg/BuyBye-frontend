import React, { useState } from 'react';
import { deleteUser } from '../../services/api';
import { useAuth } from "../../contexts/AuthContext.jsx";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const DeleteAccountCard = () => {
  const [showModal, setShowModal] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

   const handleDeleteUser = async () => {
    try {
      await deleteUser(user.id);
      
      toast.success("A sua conta foi apagada, esperemos vê-lo novamente!");
      logout();
      setTimeout(() => navigate("/"), 100);
    } catch (error) {
      console.error("Erro:", error.message);
      toast.error("Erro ao apagar a sua conta.");
    }
  }

  return (
    <div className="card mb-4">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => setShowModal(true)}
        >
          Apagar Conta
        </button>

        {showModal && (
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title">Tem a certeza que quer realizar esta ação?</h5>
                </div>
                <div className="modal-body">
                  <p>A eliminação da sua conta é uma ação permanente e não pode ser anulada.
                  Se tiver a certeza de que pretende apagar a sua conta, selecione o botão abaixo.</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleDeleteUser}>
                    Apagar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default DeleteAccountCard;
