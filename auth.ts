import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const nextAuthInstance = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🔍 Login attempt for:", credentials?.email);

        const user = await prisma.user.findUnique({
          where: { email: credentials?.email as string },
        });

        if (!user) {
          console.log("❌ User NOT found in database!");
          return null;
        }

        console.log("✅ User found! Checking password...");
        console.log("DB Password Hash:", user.password);

        const isPasswordValid = await bcrypt.compare(
          credentials?.password as string,
          user.password
        );

        console.log("🔑 Is password valid?", isPasswordValid);

        if (!isPasswordValid) {
          console.log("❌ Password does NOT match!");
          return null;
        }

        console.log("🎉 Login Successful!");
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

export const { handlers, auth, signIn, signOut } = nextAuthInstance;