import { NavLink } from 'react-router-dom';

export default function AccountNavigation() {
  return (
    <nav className="nav nav-borders mb-3">
      <NavLink to="/account/profile" className="nav-link" activeClassName="active" end>
        Perfil
      </NavLink>
      <NavLink to="/account/billing" className="nav-link" activeClassName="active">
        Encomendas
      </NavLink>
      <NavLink to="/account/security" className="nav-link" activeClassName="active">
        Segurança
      </NavLink>
    </nav>
  );
}
