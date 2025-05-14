import React from "react";
import { NavLink } from "react-router-dom";

const SideBarAdmin = () => {
  return (
    <aside
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: 280 }}
    >
      <a className="navbar-brand" href="/">
        <img
          className="w-auto mb-2"
          height={40}
          alt="BuyByeLogo"
          src="/assets/images/BuyByeLogo.png"
        />
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/admin/dashboard" className="nav-link text-white">
            <i className="bi bi-speedometer2 me-2" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/products" className="nav-link text-white">
            <i className="bi bi-box-seam me-2" />
            Produtos
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/category" className="nav-link text-white">
            <i className="bi bi-tag me-2" />
            Categorias
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders" className="nav-link text-white">
            <i className="bi bi-cart me-2" />
            Compras
          </NavLink>
        </li>
        <li></li>
        <li>
          <NavLink to="/admin/users" className="nav-link text-white">
            <i className="bi bi-person me-2" />
            Utilizadores
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};
export default SideBarAdmin;
