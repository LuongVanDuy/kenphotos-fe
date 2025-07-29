"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { connect } from "react-redux";
import { fetchPost, updatePost } from "@/store/actions/posts";
import PostForm from "@/components/Admin/Post/PostForm";
import { Form, message } from "antd";
import { useSession } from "next-auth/react";

const EditPostPage: React.FC = (props: any) => {
  const { fetchPost, postDetail, postLoading, postError, updatePost } = props;
  const { data: session } = useSession();

  const params = useParams();
  const postId = Number(params.id);
  const router = useRouter();
  const [form] = Form.useForm();
  const [formField, setFormField] = useState<any | undefined>();
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    fetchPost(postId, session?.accessToken);
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
    updatePost(payload, session?.accessToken, onSuccess, onFailure);
  };

  const handleDraft = async (values: any) => {};

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
          <button onClick={() => router.push("/admin/post/list")} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Back to Posts
          </button>
        </div>
      </div>
    );
  }

  return <PostForm form={form} onFinish={handleFinish} onSaveDraft={handleDraft} mode="edit" loading={loading} initialValues={formField} />;
};

const mapStateToProps = (state: any) => ({
  postDetail: state.posts.detail,
  postLoading: state.posts.loading,
  postError: state.posts.error,
});

const mapDispatchToProps = {
  fetchPost: fetchPost,
  updatePost: updatePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage);
