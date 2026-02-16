import React from 'react';
import { Link } from 'react-router-dom';
import NavbarDropdown from './NavbarDropdown';
import { ShoppingCart, CreditCard } from 'lucide-react';
import "../../../styles/Navbar.css"
const Navbar = () => {
  // Opciones del dropdown de Productos
  const productosMenuItems = [
    { label: 'Administrador de productos', path: '/admin/productos' },
    { label: 'Carga individual', path: '/admin/productos/carga-individual' },
    { label: 'Import Products', path: '/admin/productos/import', badge: 'dsc' }
  ];

  // Opciones del dropdown de Órdenes
  const ordenesMenuItems = [
    { label: 'Todas las órdenes', path: '/admin/ordenes' },
    { label: 'Pendientes', path: '/admin/ordenes/pendientes', badge: '12' },
    { label: 'Completadas', path: '/admin/ordenes/completadas' },
    { label: 'Canceladas', path: '/admin/ordenes/canceladas' }
  ];

  // Opciones del dropdown de Pagos
  const pagosMenuItems = [
    { label: 'Historial de pagos', path: '/admin/pagos' },
    { label: 'Métodos de pago', path: '/admin/pagos/metodos' },
    { label: 'Facturas', path: '/admin/pagos/facturas' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-brand">
          <Link to="/admin" className="brand-link">
            <div className="brand-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/>
                <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-name">falabella</span>
              <span className="brand-subtitle">Seller Center</span>
            </div>
          </Link>
        </div>

        {/* Menu Items */}
        <div className="navbar-menu">
          {/* Dropdown de Productos */}
          <NavbarDropdown 
            title="Productos" 
            items={productosMenuItems} 
          />

          {/* Dropdown de Órdenes */}
          <NavbarDropdown 
            title="Órdenes" 
            items={ordenesMenuItems} 
          />

          {/* Dropdown de Pagos */}
          <NavbarDropdown 
            title="Pagos" 
            items={pagosMenuItems} 
          />
        </div>
      </div>

    
    </nav>
  );
};

export default Navbar;