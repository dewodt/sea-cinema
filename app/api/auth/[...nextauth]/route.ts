import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "usernames", type: "text", placeholder: "username" },
        password: {
          label: "password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        // Return object (found) or null (notfound)
        const user = await prisma.user.findUnique({
          where: { username: credentials?.username },
        });

        // If username not found
        if (!user) {
          return null;
        }

        const isMatch = await bcrypt.compare(
          credentials?.password as string,
          user.password
        );

        // If username found but password doesn't match
        if (!isMatch) {
          return null;
        }

        // If username found and the password matches
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // IMPORTANT: user only available when first sign in, just like account variable.
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.name = user.name;
        token.age = user.age;
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      session.username = token.username;
      session.name = token.name;
      session.age = token.age;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 3600, // Time since **IDLE**
  },
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

declare module "next-auth/jwt/types" {
  interface JWT {
    id: string;
    name: string;
    username: string;
    age: number;
  }
}

declare module "next-auth" {
  interface Session {
    id: string;
    name: string;
    username: string;
    age: number;
  }

  interface User {
    id: string;
    name: string;
    username: string;
    age: number;
    balance: number;
    password: string;
  }
}
