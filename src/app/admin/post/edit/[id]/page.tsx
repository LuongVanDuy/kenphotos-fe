"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector, connect } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchPost, updatePost } from "@/store/actions/posts";
import { PostForm } from "../../create/page";

const EditPostPage: React.FC = (props: any) => {
  const { fetchPost, updatePost } = props;
  const params = useParams();
  const router = useRouter();
  const [initialValues, setInitialValues] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (params.id) {
        try {
          setLoading(true);
          const response = await fetchPost(Number(params.id));
          if (response.payload?.data) {
            setInitialValues(response.payload.data);
          }
        } catch (error) {
          console.error("Failed to load post:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadPost();
  }, [params.id, fetchPost]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!initialValues) {
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
      mode="edit"
      initialValues={initialValues}
      onSuccess={() => router.push("/admin/post/list")}
      postId={Number(params.id)}
      updatePost={updatePost}
    />
  );
};

const mapDispatchToProps = {
  fetchPost: fetchPost,
  updatePost: updatePost,
};

export default connect(null, mapDispatchToProps)(EditPostPage);
