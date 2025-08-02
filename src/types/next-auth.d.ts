import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: any;
  }

  interface User extends DefaultUser {
    id: number;
    accessToken: string;
    refreshToken: string;
    role?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    avatarUrl?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    user?: any;
  }
}
