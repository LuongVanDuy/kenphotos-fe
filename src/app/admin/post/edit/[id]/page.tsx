"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { connect } from "react-redux";
import { fetchPost, updatePost } from "@/store/actions/posts";
import PostForm from "@/components/Admin/Post/PostForm";

const EditPostPage: React.FC = (props: any) => {
  const { fetchPost, updatePost, postDetail, postLoading } = props;
  const params = useParams();
  const postId = Number(params.id);
  const router = useRouter();

  const loadData = () => {
    fetchPost(postId);
  };

  useEffect(() => {
    loadData();
  }, [postId]);

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

  if (!postDetail) {
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

  return (
    <PostForm
      mode="edit"
      initialValues={postDetail}
      onSuccess={() => router.push("/admin/post/list")}
      postId={Number(params.id)}
      updatePost={updatePost}
    />
  );
};

const mapStateToProps = (state: any) => ({
  postDetail: state.posts.detail,
  postLoading: state.posts.loading,
});

const mapDispatchToProps = {
  fetchPost: fetchPost,
  updatePost: updatePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage);
