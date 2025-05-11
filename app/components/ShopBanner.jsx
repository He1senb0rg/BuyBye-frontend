import React from "react";
import { useAuth } from "../contexts/AuthContext";
import FloatingInput from "./FloatingInput";


const ShopBanner = ({ title, description, link, buttonText }) => {
  const { user } = useAuth();
  const isAdmin = user && user.role === "admin";

  return (
    <>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">{title}</h1>
            <p className="lead text-body-secondary">{description}</p>
            <p>
              <a href={link} className="btn btn-primary my-2">
                {buttonText}
              </a>
              {isAdmin && (
                <button
                  className="btn btn-primary ms-2 my-2"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
              )}
            </p>
          </div>
        </div>
      </section>
      {isAdmin && (
        <div className="modal fade" id="editModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Banner da Loja</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Fechar"
                ></button>
              </div>
              <div className="modal-body">
                <FloatingInput
                  label="Título"
                  type="text"
                  placeholder="Título do Banner"
                />
                <FloatingInput
                  label="Descrição"
                  type="text"
                  placeholder="Descrição do Banner"
                />
                <FloatingInput
                  label="Link"
                  type="text"
                  placeholder="Link do Banner"
                />
                <FloatingInput
                  label="Texto do Botão"
                  type="text"
                  placeholder="Texto do Botão"
                />
                <FloatingInput
                  label="Imagem do Banner"
                  type="text"
                  placeholder="URL da Imagem"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ShopBanner;
