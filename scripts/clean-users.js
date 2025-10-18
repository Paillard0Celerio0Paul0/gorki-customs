const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function cleanUsers() {
  try {
    console.log('🧹 Nettoyage des utilisateurs existants...')
    
    // Supprimer tous les comptes OAuth
    await prisma.account.deleteMany({})
    console.log('✅ Comptes OAuth supprimés')
    
    // Supprimer toutes les sessions
    await prisma.session.deleteMany({})
    console.log('✅ Sessions supprimées')
    
    // Supprimer tous les utilisateurs
    await prisma.user.deleteMany({})
    console.log('✅ Utilisateurs supprimés')
    
    console.log('🎉 Base de données nettoyée avec succès!')
    console.log('Vous pouvez maintenant vous reconnecter avec Discord.')
    
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error)
  } finally {
    await prisma.$disconnect()
  }
}

cleanUsers()
