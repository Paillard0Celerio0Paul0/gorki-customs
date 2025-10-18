import { prisma } from '@/lib/prisma'

export async function ensureUserRole(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (user && !user.role) {
      await prisma.user.update({
        where: { id: userId },
        data: { role: 'USER' }
      })
    }
  } catch (error) {
    console.error('Erreur lors de la définition du rôle utilisateur:', error)
  }
}
