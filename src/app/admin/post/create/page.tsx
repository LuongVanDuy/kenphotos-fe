"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { createPost } from "@/store/actions/posts";
import PostForm from "@/components/Admin/Post/PostForm";
import { Form, message } from "antd";
import { useSession } from "next-auth/react";
import { AppDispatch } from "@/store/store";

const CreatePostPage: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onSuccess = () => {
    message.success("Post created successfully!");
    router.push("/admin/post/list");
    setLoading(false);
  };

  const onFailure = (error: any) => {
    message.error(error);
    setLoading(false);
  };

  const handleFinish = async (values: any) => {
    dispatch(
      createPost(
        values,
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
      createPost(
        draftValues,
        session?.accessToken || "",
        onSuccess,
        onFailure
      ) as any
    );
  };

  return (
    <PostForm
      form={form}
      onFinish={handleFinish}
      onSaveDraft={handleDraft}
      mode="create"
      loading={loading}
    />
  );
};

export default CreatePostPage;
