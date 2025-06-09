import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  const handleLogout = () => {
    logout();
    setTimeout(() => navigate("/"), 100);
  };
    const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };


  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
        <div className="container align-items-center justify-content-between px-4">
          <div className="d-flex align-items-center">
            <button
              className="navbar-toggler me-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <NavLink className="navbar-brand" to="/">
              <img
                className="w-auto mb-2"
                height={30}
                alt="BuyByeLogo"
                src="/assets/images/BuyByeLogo.png"
              />
            </NavLink>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Produtos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Promoções
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Novidades
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Sobre Nós
                </NavLink>
              </li>
            </ul>
            <form onSubmit={handleSearch} className="d-flex pe-4" role="search">
              <label className="visually-hidden" htmlFor="autoSizingInputGroup">
                Pesquisa
              </label>
              <div className="input-group">
                <div className="input-group-text">
                  <i className="bi bi-search" />
                </div>
                <input
                  type="search"
                  className="form-control"
                  aria-label="Search"
                  placeholder="Pesquisar..."
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="d-flex align-items-center">
            {/* Wishlist Icon (only available if user is logged in) */}
            <div className="pe-3">
              {user ? (
                <NavLink to="/wishlist" className="nav-link" title="Ver Wishlist">
                  <i className="bi bi-heart icon-color fs-2" />
                </NavLink>
              ) : (
                <span
                  role="button"
                  className="nav-link"
                  title="Inicie sessão para ver a sua wishlist"
                  onClick={() => window.location.href = "/login"}
                >
                  <i className="bi bi-heart icon-color fs-2" />
                </span>
              )}
            </div>

            {/* Cart Icon (only available if user is logged in) */}
            <div className="pe-3">
              {user ? (
                <NavLink to="/cart" className="nav-link" title="Ver Carrinho">
                  <i className="bi bi-cart icon-color fs-2" />
                </NavLink>
              ) : (
                <span
                  role="button"
                  className="nav-link"
                  title="Inicie sessão para aceder ao carrinho"
                  onClick={() => window.location.href = "/login"}
                >
                  <i className="bi bi-cart icon-color fs-2" />
                </span>
              )}
            </div>

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

export default Header;