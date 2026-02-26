import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage1 from './pages/auth/RegisterPage1';
import Admin from './pages/admin/Dashboard';
import Dashboard from './pages/admin/Dashboard';
import {FlashCards} from './components/FlashCards';
function App() {
  return (
    <Routes>
      {/* Ruta raíz redirige al login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path='/path' element={<FlashCards/>}/>
      {/* Rutas de autenticación (SIN navbar) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage1 />} />
      <Route path="/forgot-password" element={<div>Página de recuperación de contraseña</div>} />
      
      {/* Rutas de admin (CON AdminLayout que incluye el navbar fijo) */}
      <Route path="/admin" element={<Admin />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="productos" element={<div>Página de Productos</div>} />
        <Route path="ordenes" element={<div>Página de Órdenes</div>} />
        <Route path="pagos" element={<div>Página de Pagos</div>} />
        <Route path="informes" element={<div>Página de Informes</div>} />
        
        {/* Redirige /admin a /admin/dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>
      
      {/* Ruta 404 - cualquier ruta no definida */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;