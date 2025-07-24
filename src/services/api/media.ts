import apiClient from './base';
import { 
  ApiResponse, 
  Media, 
  UploadMediaRequest, 
  UpdateMediaRequest, 
  QueryParams,
  PaginatedResponse 
} from './types';

class MediaApiService {
  private readonly basePath = '/media';

  /**
   * Get all media files with pagination and filters
   */
  async getMedia(params?: QueryParams): Promise<ApiResponse<PaginatedResponse<Media>>> {
    const queryString = params ? '?' + new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => [k, String(v)])
    ).toString() : '';
    
    return apiClient.get<PaginatedResponse<Media>>(`${this.basePath}${queryString}`);
  }

  /**
   * Upload single file
   */
  async uploadFile(request: UploadMediaRequest): Promise<ApiResponse<Media>> {
    const formData = new FormData();
    formData.append('file', request.file);

    if (request.alt) formData.append('alt', request.alt);
    if (request.title) formData.append('title', request.title);
    if (request.description) formData.append('description', request.description);

    return apiClient.upload<Media>(`${this.basePath}/upload`, formData);
  }
}

const mediaApi = new MediaApiService();
export default mediaApi;
