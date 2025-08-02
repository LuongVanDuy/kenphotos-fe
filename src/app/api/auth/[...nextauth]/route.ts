import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";
import { fetchApi } from "../..";

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (err) {
    console.error("Lỗi decode token:", err);
    return true;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const user = await fetchApi("auth/login", "POST", {
            email: credentials.email,
            password: credentials.password,
          });

          if (user && user.accessToken) return user;
        } catch (error) {
          console.error("Login error");
          return null;
        }
        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = user;
        return token;
      }

      if (token.accessToken && isTokenExpired(token.accessToken)) {
        try {
          const refreshed = await fetchApi("auth/refresh-token", "POST", {
            token: token.refreshToken,
          });

          if (refreshed?.accessToken) {
            token.accessToken = refreshed.accessToken;
            token.refreshToken = refreshed.refreshToken;
            console.log("Token refreshed");
          } else {
            console.warn("Failed to refresh token");
          }
        } catch (error) {
          console.error("Refresh token error");
        }
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = token.user as any;
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      // Đảm bảo role có trong session.user
      if (token.user && (token.user as any).role) {
        (session.user as any).role = (token.user as any).role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
