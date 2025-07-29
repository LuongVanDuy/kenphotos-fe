export default {
  // Authentication endpoints
  login: () => "auth/login",
  register: () => "auth/register",
  forgotPassword: () => "auth/forgot-password",
  resetPassword: () => "auth/reset-password",
  verifyEmail: () => "auth/verify-email",
  refreshToken: () => "auth/refresh-token",

  // User profile 
  getProfile: () => "auth/profile",
  updateProfile: () => "auth/profile",
  changePassword: () => "auth/change-password",

  // Logout
  logout: () => "auth/logout",
};
