import { authApi, apiClient } from '@/services/api';
import { LoginRequest, LoginResponse, ApiResponse } from '@/services/api/types';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  isSuperAdmin?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiredAt: string;
}

class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly EXPIRED_AT_KEY = 'expired_at';
  private readonly USER_KEY = 'user';

  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await authApi.login(credentials);

      if (response.success && response.data) {
        // Store tokens and user info
        this.setTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          expiredAt: response.data.expiredAt,
        });
        this.setUser({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          isSuperAdmin: response.data.isSuperAdmin,
        });

        // Set auth token for API client
        apiClient.setAuthToken(response.data.accessToken);
      }

      return response;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
      };
    }
  }

  async logout(): Promise<void> {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuth();
      apiClient.clearAuthToken();
    }
  }

  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        return false;
      }

      const response = await authApi.refreshToken({ refreshToken });

      if (response.success && response.data) {
        this.setTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          expiredAt: response.data.expiredAt,
        });

        // Update auth token for API client
        apiClient.setAuthToken(response.data.accessToken);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }

  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  getExpiredAt(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.EXPIRED_AT_KEY);
  }

  getUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  setTokens(tokens: AuthTokens): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
    localStorage.setItem(this.EXPIRED_AT_KEY, tokens.expiredAt);
  }

  setUser(user: AuthUser): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  clearAuth(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.EXPIRED_AT_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    const expiredAt = this.getExpiredAt();

    if (!token || !expiredAt) return false;

    // Check if token is expired
    const expirationTime = parseInt(expiredAt) * 1000; // Convert to milliseconds
    return Date.now() < expirationTime;
  }

  isTokenExpired(): boolean {
    const expiredAt = this.getExpiredAt();
    if (!expiredAt) return true;

    const expirationTime = parseInt(expiredAt) * 1000; // Convert to milliseconds
    return Date.now() >= expirationTime;
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.isSuperAdmin === 1;
  }

  /**
   * Initialize auth token on app startup
   */
  initializeAuth(): void {
    const token = this.getAccessToken();
    if (token && this.isAuthenticated()) {
      apiClient.setAuthToken(token);
    } else {
      this.clearAuth();
    }
  }

  // Social login methods (for future implementation)
  async loginWithGoogle(): Promise<void> {
    // TODO: Implement Google OAuth
    throw new Error('Google login not implemented yet');
  }

  async loginWithFacebook(): Promise<void> {
    // TODO: Implement Facebook OAuth
    throw new Error('Facebook login not implemented yet');
  }
}

export const authService = new AuthService();
export default authService;
