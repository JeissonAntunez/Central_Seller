import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Componente para proteger rutas que requieren autenticación
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirigir al login, guardando la ubicación actual
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

interface AdminRouteProps {
  children: React.ReactNode;
}

/**
 * Componente para proteger rutas de administrador
 */
export const AdminRoute = ({ children }: AdminRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== 'ADMIN') {
    // Redirigir a la tienda si no es admin
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};