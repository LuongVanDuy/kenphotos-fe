import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id: number;
      name: string;
      email: string;
      role?: string | null;
    };
  }

  interface User extends DefaultUser {
    id: number;
    accessToken: string;
    refreshToken: string;
    role?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    user?: {
      id: number;
      name: string;
      email: string;
      role?: string | null;
    };
  }
}
