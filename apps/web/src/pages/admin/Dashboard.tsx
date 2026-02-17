// import React from 'react';
import AdminNavbar from     '../../components/admin/layout/AdminNavbar';
import AdminLayout from  '../../components/admin/layout/AdminLayout';

function Admin() {
  return (
    <div className="admin-layout">
      {/* Navbar fijo arriba */}
      <AdminNavbar />
      
      {/* Contenedor principal con el contenido dinámico */}
      <main className="admin-content">
        <AdminLayout />
      </main>
    </div>
  );
}

export default Admin;