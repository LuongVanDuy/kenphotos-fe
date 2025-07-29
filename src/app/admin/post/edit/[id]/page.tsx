"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, updatePost } from "@/store/actions/posts";
import PostForm from "@/components/Admin/Post/PostForm";
import { Form, message } from "antd";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/store/store";

const EditPostPage: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const params = useParams();
  const postId = Number(params.id);
  const router = useRouter();
  const [form] = Form.useForm();
  const [formField, setFormField] = useState<any | undefined>();
  const [loading, setLoading] = useState(false);

  // Get state from Redux store
  const postDetail = useSelector((state: RootState) => state.posts.detail);
  const postLoading = useSelector((state: RootState) => state.posts.loading);
  const postError = useSelector((state: RootState) => state.posts.error);

  const loadData = () => {
    dispatch(fetchPost(postId, session?.accessToken || "") as any);
  };

  useEffect(() => {
    if (session?.accessToken) {
      loadData();
    }
  }, [session?.accessToken]);

  useEffect(() => {
    if (postDetail) {
      setFormField(postDetail);
    }
  }, [postDetail]);

  useEffect(() => {
    if (formField && Object.keys(formField).length) {
      form.setFieldsValue({
        title: formField.title,
        content: formField.content,
        excerpt: formField.excerpt,
        slug: formField.slug,
        status: formField.status,
        password: formField.password,
        thumbnail: formField.thumbnail,
        categoryIds: formField.categoryIds,
      });
    }
  }, [formField]);

  const onSuccess = () => {
    message.success("Post updated successfully!");
    setLoading(false);
  };

  const onFailure = (error: any) => {
    message.error(error?.message || "Failed to update post");
    setLoading(false);
  };

  const handleFinish = async (values: any) => {
    const payload = {
      id: postId,
      data: {
        ...values,
      },
    };
    dispatch(
      updatePost(
        payload,
        session?.accessToken || "",
        onSuccess,
        onFailure
      ) as any
    );
  };

  const handleDraft = async (values: any) => {
    const draftValues = {
      ...values,
      status: 0,
    };
    dispatch(
      updatePost(
        draftValues,
        session?.accessToken || "",
        onSuccess,
        onFailure
      ) as any
    );
  };

  if (postLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (postError) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">Post not found</p>
          <button
            onClick={() => router.push("/admin/post/list")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Posts
          </button>
        </div>
      </div>
    );
  }

  return (
    <PostForm
      form={form}
      onFinish={handleFinish}
      onSaveDraft={handleDraft}
      mode="edit"
      loading={loading}
      initialValues={formField}
    />
  );
};

export default EditPostPage;
