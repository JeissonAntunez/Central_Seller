import axios from 'axios';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '../types/auth.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class AuthService {
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';
  private userKey = 'user_data';

  /**
   * Login de usuario
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/login`,
        credentials
      );

      // Guardar tokens y datos del usuario
      this.setTokens(response.data.tokens);
      this.setUser(response.data.user);

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Registro de nuevo usuario
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/register`,
        data
      );

      // Guardar tokens y datos del usuario
      this.setTokens(response.data.tokens);
      this.setUser(response.data.user);

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken();
      
      if (refreshToken) {
        await axios.post(`${API_URL}/auth/logout`, { refreshToken });
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Limpiar datos locales siempre
      this.clearAuth();
    }
  }

  /**
   * Refrescar access token
   */
  async refreshAccessToken(): Promise<string> {
    try {
      const refreshToken = this.getRefreshToken();

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post<{ accessToken: string }>(
        `${API_URL}/auth/refresh`,
        { refreshToken }
      );

      this.setAccessToken(response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      this.clearAuth();
      throw this.handleError(error);
    }
  }

  /**
   * Obtener usuario actual
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.userKey);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  }

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  /**
   * Verificar si el usuario es admin
   */
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'ADMIN';
  }

  /**
   * Obtener access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Obtener refresh token
   */
  private getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  /**
   * Guardar tokens
   */
  private setTokens(tokens: { accessToken: string; refreshToken: string }): void {
    localStorage.setItem(this.tokenKey, tokens.accessToken);
    localStorage.setItem(this.refreshTokenKey, tokens.refreshToken);
  }

  /**
   * Guardar solo access token
   */
  private setAccessToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Guardar datos del usuario
   */
  private setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  /**
   * Limpiar datos de autenticación
   */
  private clearAuth(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
  }

  /**
   * Manejar errores de API
   */
  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      return new Error(message);
    }
    return error instanceof Error ? error : new Error('Unknown error occurred');
  }




}



export const authService = new AuthService();