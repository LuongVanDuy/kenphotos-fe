export type ApiResponse = {
  status: number;
  data: any;
};

export type ActionType = {
  type: string;
  payload?: any;
};

export type StateType = {
  loading: boolean;
  error: boolean;
  message: string;
  detail: any;
  list: any[];
  total?: number;
};

// Admin Dashboard Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: "admin" | "editor" | "user";
  status: number;
  createdAt: string;
  lastLogin?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  status: "published" | "draft" | "archived";
  author: User;
  featuredImage?: string;
  tags: string[];
  categories: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Media {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  alt?: string;
  caption?: string;
  uploadedBy: User;
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  totalMedia: number;
  totalViews: number;
  recentUsers: User[];
  recentPosts: Post[];
  recentMedia: Media[];
}

export interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: string;
  path?: string;
  children?: MenuItem[];
  onClick?: () => void;
}

export interface BreadcrumbItem {
  title: string;
  path?: string;
}
