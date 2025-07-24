import apiClient from './base';
import { 
  ApiResponse, 
  Post, 
  CreatePostRequest, 
  UpdatePostRequest, 
  QueryParams,
  PaginatedResponse 
} from './types';

class PostApiService {
  private readonly basePath = '/posts';

  /**
   * Get all posts with pagination and filters
   */
  async getPosts(params?: QueryParams): Promise<ApiResponse<PaginatedResponse<Post>>> {
    const queryString = params ? '?' + new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => [k, String(v)])
    ).toString() : '';
    
    return apiClient.get<PaginatedResponse<Post>>(`${this.basePath}${queryString}`);
  }

  /**
   * Get post by ID
   */
  async getPostById(id: number): Promise<ApiResponse<Post>> {
    return apiClient.get<Post>(`${this.basePath}/${id}`);
  }

  /**
   * Create new post
   */
  async createPost(postData: CreatePostRequest): Promise<ApiResponse<Post>> {
    return apiClient.post<Post>(`${this.basePath}`, postData);
  }

  /**
   * Update post
   */
  async updatePost(id: number, postData: UpdatePostRequest): Promise<ApiResponse<Post>> {
    return apiClient.put<Post>(`${this.basePath}/${id}`, postData);
  }

  /**
   * Delete post
   */
  async deletePost(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`${this.basePath}/${id}`);
  }


}

const postApi = new PostApiService();
export default postApi;
