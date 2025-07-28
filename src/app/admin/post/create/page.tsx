"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { connect } from "react-redux";
import { createPost, updatePost } from "@/store/actions/posts";
import { fetchCategories } from "@/store/actions/categories";
import PostForm from "@/components/Admin/Post/PostForm";

const CreatePostPage: React.FC = (props: any) => {
  const { createPost, updatePost, fetchCategories, categoryList, categoryLoading } = props;
  const router = useRouter();
  return (
    <PostForm
      mode="create"
      onSuccess={() => router.push("/admin/post/list")}
      createPost={createPost}
      updatePost={updatePost}
      fetchCategories={fetchCategories}
    />
  );
};

const mapStateToProps = (state: any) => ({
  postDetail: state.posts.detail,
  postLoading: state.posts.loading,
});

const mapDispatchToProps = {
  createPost: createPost,
  updatePost: updatePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostPage);
