"use client";

import React, { useState } from "react";
import {
  Form,
  Card,
  Row,
  Col,
  Button,
  message,
  Upload,
  Image,
  Divider,
  Space,
  Tag,
} from "antd";
import {
  ArrowLeftOutlined,
  PlusOutlined,
  EyeOutlined,
  SaveOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { CustomInput, CustomTextarea } from "@/components/UI/CustomInput";
import { CustomSelect } from "@/components/UI/CustomSelect";
import { CustomSwitch } from "@/components/UI/CustomSwitch";
import FormActions from "@/components/UI/FormActions";
import UploadField from "@/components/UI/UploadField";
import CustomQuill from "@/components/UI/CustomQuill";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Please enter the title"),
  slug: yup.string().required("Please enter the slug"),
  excerpt: yup.string().required("Please enter the excerpt"),
  content: yup.string().required("Please enter the content"),
  status: yup.number().required("Please select status"),
  password: yup.string(),
  thumbnail: yup.mixed().nullable().required("Please upload a thumbnail"),
  categoryIds: yup.array().of(yup.number()).min(1, "Please select categories"),
});

const defaultValues = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  status: 0,
  password: "",
  thumbnail: "",
  categoryIds: [],
};

const CreatePostPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const statusOptions = [
    { value: 0, label: "Draft" },
    { value: 1, label: "Published" },
    { value: 2, label: "Archived" },
  ];

  const categoryOptions = [
    { value: 1, label: "Web Development" },
    { value: 2, label: "Tutorial" },
    { value: 3, label: "Programming" },
    { value: 4, label: "TypeScript" },
    { value: 5, label: "UI/UX" },
    { value: 6, label: "Design" },
    { value: 7, label: "State Management" },
  ];

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Post created successfully!");
      router.push("/admin/post/list");
    } catch (error) {
      message.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => router.back()}
        className="mb-4"
      >
        Back to Posts
      </Button>
      <div className="text-start mb-5">
        <h1 className="text-3xl font-bold">Create New Post</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              {/* Title */}
              <div className="mb-8">
                <label className="font-semibold block mb-2">Title</label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      placeholder="Title"
                      maxLength={300}
                    />
                  )}
                />
                {errors.title && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </div>
                )}
              </div>
              {/* Content */}
              <div className="mb-10">
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <CustomQuill
                      {...field}
                      placeholder="Write your post content here..."
                      style={{ height: "500px" }}
                      className="quill-editor"
                    />
                  )}
                />
                {errors.content && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.content.message}
                  </div>
                )}
              </div>
              {/* Excerpt */}
              <div className="mb-0">
                <label className="font-semibold block mb-1">Excerpt</label>
                <Controller
                  name="excerpt"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      placeholder="Brief description of the post"
                      maxLength={300}
                    />
                  )}
                />
                {errors.excerpt && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.excerpt.message}
                  </div>
                )}
              </div>
              {/* Slug */}
              <div className="mt-6">
                <label className="font-semibold block mb-1">URL Slug</label>
                <Controller
                  name="slug"
                  control={control}
                  render={({ field }) => (
                    <CustomInput {...field} placeholder="post-url-slug" />
                  )}
                />
                {errors.slug && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.slug.message}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              <div className="mb-6">
                <label className="font-semibold block mb-2">Status</label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      options={statusOptions}
                      style={{ width: "100%" }}
                      value={field.value}
                      onChange={(val) => field.onChange(val)}
                    />
                  )}
                />
                {errors.status && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.status.message}
                  </div>
                )}
              </div>
              <div className="flex gap-2 mb-8">
                <Button
                  type="default"
                  onClick={handleSubmit((data) =>
                    onSubmit({ ...data, status: 0 })
                  )}
                  className="flex-1"
                  disabled={loading}
                >
                  Save Draft
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="flex-1 font-semibold"
                >
                  Publish
                </Button>
              </div>
              {/* Categories */}
              <div className="mb-6">
                <label className="font-semibold block mb-2">Categories</label>
                <Controller
                  name="categoryIds"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      options={categoryOptions}
                      mode="multiple"
                      style={{ width: "100%" }}
                      value={field.value}
                      onChange={(val) => field.onChange(val)}
                    />
                  )}
                />
                {errors.categoryIds && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.categoryIds.message}
                  </div>
                )}
              </div>
              {/* Thumbnail */}
              <div className="mb-6">
                <label className="font-semibold block mb-2">Thumbnail</label>
                <Controller
                  name="thumbnail"
                  control={control}
                  render={({ field }) => (
                    <UploadField
                      {...field}
                      name="thumbnail"
                      label="Upload Image"
                      description="Main image for the post"
                      accept="image/*"
                      listType="picture-card"
                      maxCount={1}
                      onChange={(file) => field.onChange(file)}
                    />
                  )}
                />
                {errors.thumbnail && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.thumbnail.message}
                  </div>
                )}
              </div>
              {/* Password */}
              <div className="mb-0">
                <label className="font-semibold block mb-2">
                  Password (optional)
                </label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      placeholder="Password to protect post"
                      type="password"
                    />
                  )}
                />
                {errors.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
