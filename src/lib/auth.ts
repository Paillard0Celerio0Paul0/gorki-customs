import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import DiscordProvider from "next-auth/providers/discord"

export const authOptions: NextAuthOptions = {
  adapter: {
    ...PrismaAdapter(prisma),
    async createUser(user) {
      // Créer l'utilisateur avec le rôle USER par défaut
      return await prisma.user.create({
        data: {
          ...user,
          role: 'USER',
        }
      })
    },
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role
        token.provider = account?.provider
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.provider = token.provider as string
      }
      return session
    },
    async signIn({ account }) {
      // Vérifier que l'utilisateur se connecte via Discord
      return account?.provider === 'discord'
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  debug: process.env.NODE_ENV === 'development',
}
