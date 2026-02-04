import React from 'react';
import { Link } from 'react-router-dom';
import logoCentralSeller from '../../../assets/img/logoseller.png';
import "../../../styles/Adminnavbar.css"
interface AdminNavbarProps {
  storeName?: string;
  storeId?: string;
  userAvatar?: string;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ 
  storeName = "Tienda Central", 
  storeId = "ID: 982551",
  userAvatar 
}) => {
  return (
    <nav className="admin-navbar">
      <div className="navbar-container">
        {/* Logo y nombre */}
        <div className="navbar-brand">
          <img src={logoCentralSeller} alt="CentralSeller Logo" className="navbar-logo" />
          <span className="brand-name">CentralSeller</span>
        </div>

        {/* Menú de navegación */}
        <div className="navbar-menu">
          <Link to="/admin/productos" className="navbar-item">
            Productos
            <svg className="dropdown-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          
          <Link to="/admin/ordenes" className="navbar-item">
            Órdenes
            <svg className="dropdown-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          
          <Link to="/admin/pagos" className="navbar-item">
            Pagos
            <svg className="dropdown-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          
          <Link to="/admin/informes" className="navbar-item">
            Informes
            <svg className="dropdown-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        {/* Acciones de la derecha */}
        <div className="navbar-actions">
          {/* Búsqueda */}
          <button className="navbar-icon-button" aria-label="Buscar">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Notificaciones */}
          <button className="navbar-icon-button" aria-label="Notificaciones">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span className="notification-badge"></span>
          </button>

          {/* Ayuda */}
          <button className="navbar-icon-button" aria-label="Ayuda">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Perfil de usuario */}
          <div className="navbar-profile">
            <div className="profile-info">
              <span className="profile-store-name">{storeName}</span>
              <span className="profile-store-id">{storeId}</span>
            </div>
            <div className="profile-avatar">
              {userAvatar ? (
                <img src={userAvatar} alt="Usuario" />
              ) : (
                <div className="avatar-placeholder">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;