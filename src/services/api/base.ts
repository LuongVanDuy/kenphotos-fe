import { ApiResponse, RequestConfig } from './types';

export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  defaultHeaders?: Record<string, string>;
  retries?: number;
}

class BaseApiClient {
  private baseURL: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;
  private retries: number;

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout || 30000;
    this.defaultHeaders = config.defaultHeaders || {};
    this.retries = config.retries || 3;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit & RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...this.defaultHeaders,
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    // Add timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    config.signal = controller.signal;

    let lastError: Error;
    
    // Retry logic
    for (let attempt = 0; attempt <= this.retries; attempt++) {
      try {
        const response = await fetch(url, config);
        clearTimeout(timeoutId);
        
        let data: any;
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        if (!response.ok) {
          return {
            success: false,
            error: data.message || data.error || `HTTP error! status: ${response.status}`,
            errors: data.errors,
          };
        }

        return {
          success: true,
          data,
          message: data.message,
        };
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        // Don't retry on abort (timeout) or last attempt
        if (lastError.name === 'AbortError' || attempt === this.retries) {
          break;
        }
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }

    clearTimeout(timeoutId);
    
    return {
      success: false,
      error: lastError.name === 'AbortError' 
        ? 'Request timeout' 
        : lastError.message || 'Network error',
    };
  }

  // HTTP Methods
  async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', ...config });
  }

  async post<T>(
    endpoint: string, 
    data?: any, 
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });
  }

  async put<T>(
    endpoint: string, 
    data?: any, 
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });
  }

  async patch<T>(
    endpoint: string, 
    data?: any, 
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', ...config });
  }

  // File upload
  async upload<T>(
    endpoint: string,
    formData: FormData,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const uploadConfig = {
      ...config,
      headers: {
        // Don't set Content-Type for FormData, let browser set it with boundary
        ...config?.headers,
      },
    };
    
    // Remove Content-Type if it exists for file uploads
    if (uploadConfig.headers && 'Content-Type' in uploadConfig.headers) {
      delete uploadConfig.headers['Content-Type'];
    }

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      ...uploadConfig,
    });
  }

  // Set authorization header
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Remove authorization header
  clearAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
  }

  // Update base URL
  setBaseURL(baseURL: string): void {
    this.baseURL = baseURL;
  }

  // Get current base URL
  getBaseURL(): string {
    return this.baseURL;
  }
}

// Create default instance
const apiClient = new BaseApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://160.191.245.248',
  timeout: 30000,
  retries: 3,
});

export default apiClient;
export { BaseApiClient };
