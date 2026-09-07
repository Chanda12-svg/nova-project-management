import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.email === "test@test.com" && credentials?.password === "password") {
          const user = await db.user.findUnique({
            where: { email: "test@test.com" }
          })
          if (user) {
            return { 
              id: user.id, 
              name: user.name ?? undefined, 
              email: user.email 
            }
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
})