import apiClient from './base';
import { 
  ApiResponse, 
  User, 
  CreateUserRequest, 
  UpdateUserRequest, 
  QueryParams,
  PaginatedResponse 
} from './types';

class UserApiService {
  private readonly basePath = '/v1/users';

  /**
   * Get all users with pagination and filters
   */
  async getUsers(params?: QueryParams): Promise<ApiResponse<PaginatedResponse<User>>> {
    const queryString = params ? '?' + new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => [k, String(v)])
    ).toString() : '';
    
    return apiClient.get<PaginatedResponse<User>>(`${this.basePath}${queryString}`);
  }

  /**
   * Get user by ID
   */
  async getUserById(id: number): Promise<ApiResponse<User>> {
    return apiClient.get<User>(`${this.basePath}/${id}`);
  }

  /**
   * Create new user
   */
  async createUser(userData: CreateUserRequest): Promise<ApiResponse<User>> {
    return apiClient.post<User>(`${this.basePath}`, userData);
  }

  /**
   * Update user
   */
  async updateUser(id: number, userData: UpdateUserRequest): Promise<ApiResponse<User>> {
    return apiClient.put<User>(`${this.basePath}/${id}`, userData);
  }

  /**
   * Delete user
   */
  async deleteUser(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`${this.basePath}/${id}`);
  }


}

const userApi = new UserApiService();
export default userApi;
