export default {
  fetchUsers: (params?: Record<string, any>) => {
    const queryString = params
      ? "?" +
        new URLSearchParams(
          Object.entries(params).filter(
            ([_, v]) => v !== undefined && v !== null && v !== ""
          )
        ).toString()
      : "";
    return "users" + queryString;
  },
  fetchUser: (id: number) => `users/${id}`,
  createUser: () => "users",
  updateUser: (id: number) => `users/${id}`,
  deleteUser: (id: number) => `users/${id}`,
  changePassword: (id: number) => `users/${id}/change-password`,
};
