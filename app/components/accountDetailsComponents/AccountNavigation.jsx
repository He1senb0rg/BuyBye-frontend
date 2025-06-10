import { NavLink } from 'react-router-dom';

export default function AccountNavigation() {
  return (
    <nav className="nav nav-borders mb-3">
      <NavLink to="/account/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
        Perfil
      </NavLink>
      <NavLink to="/account/billing" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        Encomendas
      </NavLink>
      <NavLink to="/account/security" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        Segurança
      </NavLink>
      <NavLink to="/account/reviews" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        Avaliações
      </NavLink>
    </nav>
  );
}