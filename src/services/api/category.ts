import apiClient from './base';
import { 
  ApiResponse, 
  Category, 
  CreateCategoryRequest, 
  UpdateCategoryRequest, 
  QueryParams,
  PaginatedResponse 
} from './types';

class CategoryApiService {
  private readonly basePath = '/v1/tour/categories';

  /**
   * Get all categories with pagination and filters
   */
  async getCategories(params?: QueryParams): Promise<ApiResponse<PaginatedResponse<Category>>> {
    const queryString = params ? '?' + new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => [k, String(v)])
    ).toString() : '';
    
    return apiClient.get<PaginatedResponse<Category>>(`${this.basePath}${queryString}`);
  }

  /**
   * Get category by ID
   */
  async getCategoryById(id: number): Promise<ApiResponse<Category>> {
    return apiClient.get<Category>(`${this.basePath}/${id}`);
  }

  /**
   * Create new category
   */
  async createCategory(categoryData: CreateCategoryRequest): Promise<ApiResponse<Category>> {
    return apiClient.post<Category>(`${this.basePath}`, categoryData);
  }

  /**
   * Update category
   */
  async updateCategory(id: number, categoryData: UpdateCategoryRequest): Promise<ApiResponse<Category>> {
    return apiClient.put<Category>(`${this.basePath}/${id}`, categoryData);
  }

  /**
   * Delete category
   */
  async deleteCategory(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`${this.basePath}/${id}`);
  }


}

const categoryApi = new CategoryApiService();
export default categoryApi;
