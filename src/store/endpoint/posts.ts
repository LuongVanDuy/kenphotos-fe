export default {
  fetchPosts: (params?: Record<string, any>) => {
    const queryString = params
      ? "?" +
        new URLSearchParams(
          Object.entries(params)
            .filter(([_, v]) => v !== undefined && v !== null && v !== "")
            .map(([k, v]) => [k, typeof v === "boolean" ? String(v) : v])
        ).toString()
      : "";
    return "posts" + queryString;
  },
  fetchPost: (id: number) => `posts/${id}`,
  createPost: () => "posts",
  updatePost: (id: number) => `posts/${id}`,
  deletePost: () => `posts/delete`,

  //
  fetchPublicPosts: (params?: Record<string, any>) => {
    const queryString = params
      ? "?" +
        new URLSearchParams(
          Object.entries(params)
            .filter(([_, v]) => v !== undefined && v !== null && v !== "")
            .map(([k, v]) => [k, typeof v === "boolean" ? String(v) : v])
        ).toString()
      : "";
    return "public/posts" + queryString;
  },
  fetchPublicPost: (slug: string) => `public/posts/${slug}`,
};
