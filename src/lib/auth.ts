import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import DiscordProvider from "next-auth/providers/discord"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
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
    async signIn({ user, account }) {
      // Vérifier que l'utilisateur se connecte via Discord
      if (account?.provider !== 'discord') {
        return false
      }

      // Créer ou mettre à jour l'utilisateur
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email! }
      })

      if (!existingUser) {
        // Nouvel utilisateur - rôle USER par défaut
        await prisma.user.create({
          data: {
            email: user.email!,
            name: user.name,
            image: user.image,
            role: 'USER',
            emailVerified: new Date(),
          }
        })
      } else {
        // Mettre à jour les informations Discord
        await prisma.user.update({
          where: { email: user.email! },
          data: {
            name: user.name,
            image: user.image,
          }
        })
      }

      return true
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
}
