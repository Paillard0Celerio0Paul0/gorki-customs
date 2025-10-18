const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function promoteUser(email) {
  try {
    console.log(`🔍 Recherche de l'utilisateur avec l'email: ${email}`)
    
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      console.log('❌ Utilisateur non trouvé')
      return
    }

    console.log(`👤 Utilisateur trouvé: ${user.name} (${user.email})`)
    console.log(`📊 Rôle actuel: ${user.role}`)

    if (user.role === 'ADMIN') {
      console.log('✅ L\'utilisateur est déjà admin')
      return
    }

    // Promouvoir en admin
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' }
    })

    console.log('🎉 Utilisateur promu en admin avec succès!')
    console.log(`👑 Nouveau rôle: ${updatedUser.role}`)
    
  } catch (error) {
    console.error('❌ Erreur lors de la promotion:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Récupérer l'email depuis les arguments de ligne de commande
const email = process.argv[2]

if (!email) {
  console.log('❌ Usage: node scripts/promote-user.js <email>')
  console.log('📝 Exemple: node scripts/promote-user.js user@example.com')
  process.exit(1)
}

promoteUser(email)
