export type ApiResponse = {
  status: number;
  data: any;
  total?: number;
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
  uploadLoading?: boolean;
  uploadError?: boolean;
  uploadMessage?: string;
  listPublic?: any[];
  totalPublic?: number;
  detailPublic?: any;
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

export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: number;
  thumbnail?: string;
  categoryIds: number[];
  categories?: Array<{
    category: {
      id: number;
      name: string;
      slug: string;
    };
  }>;
}

export interface Media {
  id: number;
  name: string;
  slug: string;
  createdTime: string;
  uploadedBy: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
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
