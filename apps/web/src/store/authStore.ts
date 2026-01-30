import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { authService } from '../services/auth.service';
import type { LoginCredentials, RegisterData, User } from '../types/auth.types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        /**
         * Login
         */
        login: async (credentials: LoginCredentials) => {
          set({ isLoading: true, error: null });
          
          try {
            const response = await authService.login(credentials);
            
            set({
              user: response.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            const errorMessage = error instanceof Error 
              ? error.message 
              : 'Error al iniciar sesión';
            
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: errorMessage,
            });
            
            throw error;
          }
        },

        /**
         * Registro
         */
        register: async (data: RegisterData) => {
          set({ isLoading: true, error: null });
          
          try {
            const response = await authService.register(data);
            
            set({
              user: response.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            const errorMessage = error instanceof Error 
              ? error.message 
              : 'Error al registrar usuario';
            
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: errorMessage,
            });
            
            throw error;
          }
        },

        /**
         * Logout
         */
        logout: async () => {
          set({ isLoading: true });
          
          try {
            await authService.logout();
          } catch (error) {
            console.error('Error during logout:', error);
          } finally {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
          }
        },

        /**
         * Verificar autenticación al cargar la app
         */
        checkAuth: () => {
          const isAuthenticated = authService.isAuthenticated();
          const user = authService.getCurrentUser();

          set({
            user: user,
            isAuthenticated: isAuthenticated,
          });
        },

        /**
         * Limpiar error
         */
        clearError: () => {
          set({ error: null });
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: 'AuthStore',
    }
  )
);