const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function cleanAllData() {
  try {
    console.log('🧹 Nettoyage complet de la base de données...')
    console.log('⚠️  ATTENTION: Toutes les données seront supprimées!')
    console.log('')
    
    // Supprimer dans l'ordre pour respecter les contraintes de clés étrangères
    console.log('🗑️  Suppression des clips...')
    await prisma.clip.deleteMany({})
    console.log('✅ Clips supprimés')
    
    console.log('🗑️  Suppression des statistiques...')
    await prisma.statistic.deleteMany({})
    console.log('✅ Statistiques supprimées')
    
    console.log('🗑️  Suppression des picks/bans...')
    await prisma.pickBan.deleteMany({})
    console.log('✅ Picks/Bans supprimés')
    
    console.log('🗑️  Suppression des joueurs...')
    await prisma.player.deleteMany({})
    console.log('✅ Joueurs supprimés')
    
    console.log('🗑️  Suppression des équipes...')
    await prisma.team.deleteMany({})
    console.log('✅ Équipes supprimées')
    
    console.log('🗑️  Suppression des games...')
    await prisma.game.deleteMany({})
    console.log('✅ Games supprimées')
    
    console.log('🗑️  Suppression des comptes OAuth...')
    await prisma.account.deleteMany({})
    console.log('✅ Comptes OAuth supprimés')
    
    console.log('🗑️  Suppression des sessions...')
    await prisma.session.deleteMany({})
    console.log('✅ Sessions supprimées')
    
    console.log('🗑️  Suppression des utilisateurs...')
    await prisma.user.deleteMany({})
    console.log('✅ Utilisateurs supprimés')
    
    console.log('🗑️  Suppression des tokens de vérification...')
    await prisma.verificationToken.deleteMany({})
    console.log('✅ Tokens de vérification supprimés')
    
    console.log('')
    console.log('🎉 Nettoyage complet terminé!')
    console.log('📊 La base de données est maintenant vide.')
    console.log('')
    console.log('💡 Prochaines étapes:')
    console.log('   1. Connectez-vous avec Discord pour créer votre compte')
    console.log('   2. Promouvez-vous en admin si nécessaire')
    console.log('   3. Créez vos premières games et équipes')
    
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Demander confirmation
console.log('🚨 NETTOYAGE COMPLET DE LA BASE DE DONNÉES 🚨')
console.log('')
console.log('Cette action va supprimer TOUTES les données:')
console.log('- Tous les utilisateurs')
console.log('- Toutes les games')
console.log('- Tous les clips')
console.log('- Toutes les statistiques')
console.log('')
console.log('Pour continuer, exécutez: node scripts/clean-all-data.js --confirm')
console.log('')

// Vérifier si l'utilisateur a confirmé
if (process.argv[2] === '--confirm') {
  cleanAllData()
} else {
  console.log('❌ Nettoyage annulé. Ajoutez --confirm pour confirmer.')
  process.exit(0)
}
