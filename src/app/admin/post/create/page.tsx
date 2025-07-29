"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { connect } from "react-redux";
import { createPost } from "@/store/actions/posts";
import PostForm from "@/components/Admin/Post/PostForm";
import { Form, message } from "antd";
import { useSession } from "next-auth/react";

const CreatePostPage: React.FC = (props: any) => {
  const { createPost, updateUser } = props;
  const { data: session } = useSession();

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
    createPost(values, session?.accessToken, onSuccess, onFailure);
  };

  const handleDraft = async (values: any) => {
    const draftValues = {
      ...values,
      status: 0,
    };
    createPost(draftValues, session?.accessToken, onSuccess, onFailure);
  };

  return <PostForm form={form} onFinish={handleFinish} onSaveDraft={handleDraft} mode="create" loading={loading} />;
};

const mapStateToProps = (state: any) => ({
  postDetail: state.posts.detail,
  postLoading: state.posts.loading,
});

const mapDispatchToProps = {
  createPost: createPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostPage);
