import React, { useState } from 'react';

const DeleteAccountCard = () => {
  const [showModal, setShowModal] = useState(false);

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
                  <h5 className="modal-title">Tem a certeza?</h5>
                  <button
                    type="button"
                    className="btn btn-md ms-auto"
                    onClick={() => setShowModal(false)}
                    aria-label="Fechar"
                  >
                    <i className="bi bi-x"></i>
                  </button>
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
                  <button type="button" className="btn btn-danger">
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
