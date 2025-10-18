const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function listUsers() {
  try {
    console.log('👥 Liste des utilisateurs:')
    console.log('=' .repeat(50))
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    if (users.length === 0) {
      console.log('❌ Aucun utilisateur trouvé')
      return
    }

    users.forEach((user, index) => {
      const roleIcon = user.role === 'ADMIN' ? '👑' : '👤'
      const date = new Date(user.createdAt).toLocaleDateString('fr-FR')
      
      console.log(`${index + 1}. ${roleIcon} ${user.name || 'Sans nom'}`)
      console.log(`   📧 ${user.email}`)
      console.log(`   🏷️  Rôle: ${user.role}`)
      console.log(`   📅 Créé: ${date}`)
      console.log('')
    })

    console.log('💡 Pour promouvoir un utilisateur en admin:')
    console.log('   node scripts/promote-user.js <email>')
    
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des utilisateurs:', error)
  } finally {
    await prisma.$disconnect()
  }
}

listUsers()
