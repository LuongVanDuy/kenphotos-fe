export default {
  fetchPosts: (params?: Record<string, any>) => {
    const queryString = params
      ? "?" + new URLSearchParams(Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== "")).toString()
      : "";
    return "posts" + queryString;
  },
};
