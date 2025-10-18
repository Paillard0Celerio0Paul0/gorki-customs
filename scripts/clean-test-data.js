const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function cleanTestData() {
  try {
    console.log('🧹 Nettoyage des données de test...')
    console.log('ℹ️  Les utilisateurs seront conservés')
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
    
    console.log('')
    console.log('🎉 Nettoyage des données de test terminé!')
    console.log('👥 Les utilisateurs ont été conservés.')
    console.log('')
    console.log('💡 Vous pouvez maintenant:')
    console.log('   1. Créer vos propres games et équipes')
    console.log('   2. Uploader vos propres clips')
    console.log('   3. Générer vos propres statistiques')
    
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error)
  } finally {
    await prisma.$disconnect()
  }
}

cleanTestData()
