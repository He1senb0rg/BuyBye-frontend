import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useEffect } from "react";
import toast from "react-hot-toast";

const HeaderAdmin = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  useEffect(() => {
    const message = localStorage.getItem("logoutMessage");
    if (message) {
      toast.success(message);
      localStorage.removeItem("logoutMessage");
    }
  }, []);

  return (
    <header>
      <nav className="navbar navbar-expand-lg shadow-sm d-flex justify-content-end bg-dark-subtle">
        <div className="d-flex justify-content-end px-4">
          <div className="d-flex align-items-center">
            <a href="/" className="text-white me-3">
            <i className="bi bi-house-door-fill fs-2 icon-color" />
            </a>
            <div className="dropdown">
              <a
                href="#"
                className="d-flex align-items-center text-white text-decoration-none"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle fs-2 icon-color" />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end pt-0 "
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <h6 className="dropdown-header bg-primary text-light fw-bold py-2 rounded-top">
                    {user ? `Olá, ${user.name}!` : "Junta-te à BuyBye!"}
                  </h6>
                </li>
                {user ? (
                  <>
                    <li>
                      <a className="dropdown-item" href="/account/profile">
                        Perfil do Utilizador
                      </a>
                    </li>
                    {user.role === "admin" && (
                      <li>
                        <a className="dropdown-item" href="/admin/dashboard">
                          Painel de Controlo
                        </a>
                      </li>
                    )}
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Terminar Sessão
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <a className="dropdown-item" href="/register">
                        Registar Conta
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/login">
                        Iniciar Sessão
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderAdmin;
