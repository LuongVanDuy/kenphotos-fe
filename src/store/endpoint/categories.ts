export default {
  fetchCategories: (params?: Record<string, any>) => {
    const queryString = params
      ? "?" +
        new URLSearchParams(
          Object.entries(params)
            .filter(([_, v]) => v !== undefined && v !== null && v !== "")
            .map(([k, v]) => [k, typeof v === "boolean" ? String(v) : v])
        ).toString()
      : "";
    return "post/categories" + queryString;
  },
  fetchCategory: (id: number) => `post/categories/${id}`,
  createCategory: () => "post/categories",
  updateCategory: (id: number) => `post/categories/${id}`,
  permanentDeleteCategory: () => `post/categories/permanent`,
};
