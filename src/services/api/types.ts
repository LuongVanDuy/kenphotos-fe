// Base API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
  expiredAt: string;
  isSuperAdmin?: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiredAt: string;
}

// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  isSuperAdmin?: number;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  status?: 'active' | 'inactive' | 'pending';
}

// Post Types
export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  status: 'published' | 'draft' | 'archived';
  featuredImage?: string;
  authorId: number;
  author?: User;
  categoryId?: number;
  category?: Category;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  excerpt?: string;
  status?: 'published' | 'draft' | 'archived';
  featuredImage?: string;
  categoryId?: number;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {}

// Category Types
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: number;
  parent?: Category;
  children?: Category[];
  status: 'active' | 'inactive';
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  image?: string;
  parentId?: number;
  status?: 'active' | 'inactive';
  sortOrder?: number;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {}

// Media Types
export interface Media {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  url: string;
  alt?: string;
  title?: string;
  description?: string;
  uploadedBy: number;
  uploader?: User;
  createdAt: string;
  updatedAt: string;
}

export interface UploadMediaRequest {
  file: File;
  alt?: string;
  title?: string;
  description?: string;
}

export interface UpdateMediaRequest {
  alt?: string;
  title?: string;
  description?: string;
}

// Mail Types
export interface SendMailRequest {
  to: string | string[];
  subject: string;
  content: string;
  template?: string;
  data?: Record<string, any>;
}

// Query Parameters
export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  status?: string;
  [key: string]: any;
}

// Error Types
export interface ApiError {
  message: string;
  code?: string;
  field?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

// Request Config
export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
}
