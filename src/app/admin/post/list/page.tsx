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
import { Post } from "@/types";
import CustomTable from "@/components/UI/CustomTable";

const { Option } = Select;

const PostListPage: React.FC = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Mock data for demonstration
  const mockPosts: Post[] = [
    {
      id: "1",
      title: "Getting Started with Next.js 14",
      content:
        "This is a comprehensive guide to getting started with Next.js 14...",
      excerpt:
        "Learn the basics of Next.js 14 and how to build modern web applications.",
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
      excerpt:
        "Deep dive into advanced TypeScript patterns for better code organization.",
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
      content:
        "Learn how to create beautiful and responsive user interfaces...",
      excerpt:
        "Master the art of building responsive UIs using Ant Design components.",
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
      excerpt:
        "Simplify your state management with Redux Toolkit's modern approach.",
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      let filteredPosts = mockPosts;
      if (statusFilter !== "all") {
        filteredPosts = mockPosts.filter(
          (post) => post.status === statusFilter
        );
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

  const handleDelete = (post: Post) => {};

  const handleView = (post: Post) => {
    router.push(`/admin/post/${post.id}`);
  };

  const handleStatusChange = async (post: Post, newStatus: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setPosts(
        posts.map((p) =>
          p.id === post.id ? { ...p, status: newStatus as any } : p
        )
      );
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
                <Tag key={tag} className="text-xs px-2 py-0.5" color="blue">
                  {tag}
                </Tag>
              ))}
              {record.tags.length > 3 && (
                <Tag className="text-xs px-2 py-0.5">
                  +{record.tags.length - 3}
                </Tag>
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
        <Tag color={status === "published" ? "green" : "orange"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      render: (categories: string[]) => (
        <div className="space-y-1">
          {categories.map((category) => (
            <Tag key={category} className="text-xs px-2 py-0.5">
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
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push("/admin/post/create")}
        >
          Add New Post
        </Button>
      </div>

      <CustomTable
        columns={columns}
        data={posts}
        loading={loading}
        onRefresh={loadPosts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        searchable
        exportable
      />
    </div>
  );
};

export default PostListPage;
