import apiClient from './base';
import { 
  ApiResponse, 
  LoginRequest, 
  LoginResponse, 
  RefreshTokenRequest, 
  RefreshTokenResponse 
} from './types';

class AuthApiService {
  private readonly basePath = '/auth';

  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return apiClient.post<LoginResponse>(`${this.basePath}/login`, credentials);
  }

  /**
   * Logout user
   */
  async logout(): Promise<ApiResponse<void>> {
    return apiClient.post<void>(`${this.basePath}/logout`);
  }

  /**
   * Refresh access token
   */
  async refreshToken(request: RefreshTokenRequest): Promise<ApiResponse<RefreshTokenResponse>> {
    return apiClient.post<RefreshTokenResponse>(`${this.basePath}/refresh-token`, request);
  }

  /**
   * Register new user
   */
  async register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<ApiResponse<LoginResponse>> {
    return apiClient.post<LoginResponse>(`${this.basePath}/register`, userData);
  }

  /**
   * Verify email
   */
  async verifyEmail(token: string): Promise<ApiResponse<void>> {
    return apiClient.post<void>(`${this.basePath}/verify-email`, { token });
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<ApiResponse<void>> {
    return apiClient.post<void>(`${this.basePath}/forgot-password`, { email });
  }

  /**
   * Reset password
   */
  async resetPassword(token: string, password: string): Promise<ApiResponse<void>> {
    return apiClient.post<void>(`${this.basePath}/reset-password`, {
      token,
      password
    });
  }
}

const authApi = new AuthApiService();
export default authApi;
