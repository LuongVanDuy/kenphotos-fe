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
  fetchPost: (id: string) => `posts/${id}`,
  createPost: () => "posts",
  updatePost: (id: string) => `posts/${id}`,
  deletePost: (id: string) => `posts/${id}`,
};
