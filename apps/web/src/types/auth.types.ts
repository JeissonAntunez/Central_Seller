/**
 * Types para autenticación
 * Este archivo contiene todos los tipos relacionados con auth
 * que se comparten entre componentes, servicios y store
 */

// ============================================
// TIPOS DE AUTENTICACIÓN
// ============================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

// ============================================
// TIPOS DE ESTADO
// ============================================

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ============================================
// TIPOS DE ERRORES
// ============================================

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

// ============================================
// TIPOS DE FORMULARIOS
// ============================================

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}