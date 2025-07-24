"use client";

import React, { useState, useEffect } from "react";
import { Button, Tag, Avatar, Space, message, Select, Card } from "antd";
import {
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { DataTable, showConfirmModal } from "@/components/Admin/UI";
import { Post } from "@/types";

const { Option } = Select;

const PostListPage: React.FC = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data for demonstration
  const mockPosts: Post[] = [
    {
      id: "1",
      title: "Getting Started with Next.js 14",
      content: "This is a comprehensive guide to getting started with Next.js 14...",
      excerpt: "Learn the basics of Next.js 14 and how to build modern web applications.",
      status: "published",
      author: {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        status: "active",
        createdAt: "2024-01-15",
      },
      featuredImage: "/images/nextjs-guide.jpg",
      tags: ["nextjs", "react", "tutorial"],
      categories: ["Web Development", "Tutorial"],
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
      publishedAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Advanced TypeScript Patterns",
      content: "Explore advanced TypeScript patterns and techniques...",
      excerpt: "Deep dive into advanced TypeScript patterns for better code organization.",
      status: "draft",
      author: {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "editor",
        status: "active",
        createdAt: "2024-01-14",
      },
      tags: ["typescript", "patterns", "advanced"],
      categories: ["Programming", "TypeScript"],
      createdAt: "2024-01-14",
      updatedAt: "2024-01-16",
    },
    {
      id: "3",
      title: "Building Responsive UIs with Ant Design",
      content: "Learn how to create beautiful and responsive user interfaces...",
      excerpt: "Master the art of building responsive UIs using Ant Design components.",
      status: "published",
      author: {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        status: "active",
        createdAt: "2024-01-15",
      },
      featuredImage: "/images/antd-ui.jpg",
      tags: ["antd", "ui", "responsive"],
      categories: ["UI/UX", "Design"],
      createdAt: "2024-01-13",
      updatedAt: "2024-01-13",
      publishedAt: "2024-01-13",
    },
    {
      id: "4",
      title: "State Management with Redux Toolkit",
      content: "Modern state management patterns using Redux Toolkit...",
      excerpt: "Simplify your state management with Redux Toolkit's modern approach.",
      status: "archived",
      author: {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "editor",
        status: "active",
        createdAt: "2024-01-14",
      },
      tags: ["redux", "state-management", "toolkit"],
      categories: ["Programming", "State Management"],
      createdAt: "2024-01-12",
      updatedAt: "2024-01-12",
      publishedAt: "2024-01-12",
    },
  ];

  useEffect(() => {
    loadPosts();
  }, [statusFilter]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      let filteredPosts = mockPosts;
      if (statusFilter !== 'all') {
        filteredPosts = mockPosts.filter(post => post.status === statusFilter);
      }

      setPosts(filteredPosts);
    } catch (error) {
      message.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: Post) => {
    router.push(`/admin/post/edit/${post.id}`);
  };

  const handleDelete = (post: Post) => {
    showConfirmModal({
      title: "Delete Post",
      content: `Are you sure you want to delete "${post.title}"? This action cannot be undone.`,
      onConfirm: async () => {
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          setPosts(posts.filter(p => p.id !== post.id));
          message.success("Post deleted successfully");
        } catch (error) {
          message.error("Failed to delete post");
        }
      },
      type: "error",
      okText: "Delete",
      cancelText: "Cancel",
    });
  };

  const handleView = (post: Post) => {
    router.push(`/admin/post/${post.id}`);
  };

  const handleStatusChange = async (post: Post, newStatus: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setPosts(posts.map(p =>
        p.id === post.id ? { ...p, status: newStatus as any } : p
      ));
      message.success(`Post status updated to ${newStatus}`);
    } catch (error) {
      message.error("Failed to update post status");
    }
  };

  const columns = [
    {
      title: "Post",
      key: "post",
      render: (_: any, record: Post) => (
        <div className="flex items-start space-x-3">
          {record.featuredImage && (
            <img
              src={record.featuredImage}
              alt={record.title}
              className="w-16 h-16 object-cover rounded"
            />
          )}
          <div className="flex-1">
            <div className="font-medium text-base mb-1">{record.title}</div>
            {record.excerpt && (
              <div className="text-sm text-gray-500 mb-2 line-clamp-2">
                {record.excerpt}
              </div>
            )}
            <div className="flex flex-wrap gap-1">
              {record.tags.slice(0, 3).map((tag) => (
                <Tag key={tag} size="small" color="blue">
                  {tag}
                </Tag>
              ))}
              {record.tags.length > 3 && (
                <Tag size="small">+{record.tags.length - 3}</Tag>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Author",
      key: "author",
      render: (_: any, record: Post) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{record.author.name}</div>
            <div className="text-xs text-gray-500">{record.author.role}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: Post) => (
        <Select
          value={status}
          size="small"
          style={{ width: 100 }}
          onChange={(value) => handleStatusChange(record, value)}
        >
          <Option value="draft">
            <Tag color="orange">Draft</Tag>
          </Option>
          <Option value="published">
            <Tag color="green">Published</Tag>
          </Option>
          <Option value="archived">
            <Tag color="red">Archived</Tag>
          </Option>
        </Select>
      ),
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      render: (categories: string[]) => (
        <div className="space-y-1">
          {categories.map((category) => (
            <Tag key={category} size="small">
              {category}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <div>
          <div className="text-sm">{new Date(date).toLocaleDateString()}</div>
          <div className="text-xs text-gray-500">
            {new Date(date).toLocaleTimeString()}
          </div>
        </div>
      ),
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => (
        <div className="text-sm">{new Date(date).toLocaleDateString()}</div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Posts</h1>
          <p className="text-gray-600">Manage your blog posts and articles</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push("/admin/post/create")}
        >
          Add New Post
        </Button>
      </div>

      <Card className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Filter by status:</span>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 120 }}
            >
              <Option value="all">All Posts</Option>
              <Option value="published">Published</Option>
              <Option value="draft">Draft</Option>
              <Option value="archived">Archived</Option>
            </Select>
          </div>

          <div className="text-sm text-gray-500">
            Total: {posts.length} posts
          </div>
        </div>
      </Card>

      <DataTable
        columns={columns}
        data={posts}
        loading={loading}
        onRefresh={loadPosts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        searchable
        exportable
        title="All Posts"
      />
    </div>
  );
};

export default PostListPage;
