import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Début du seeding...')

  // Créer des utilisateurs de démonstration (Discord)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@gorki-custom.com' },
    update: {},
    create: {
      email: 'admin@gorki-custom.com',
      name: 'Admin Gorki',
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  })

  const regularUser = await prisma.user.upsert({
    where: { email: 'user@gorki-custom.com' },
    update: {},
    create: {
      email: 'user@gorki-custom.com',
      name: 'Joueur Test',
      role: 'USER',
      emailVerified: new Date(),
    },
  })

  console.log('✅ Utilisateurs créés')

  // Créer des games de démonstration
  const game1 = await prisma.game.create({
    data: {
      name: 'Finale Tournoi Hiver 2024',
      date: new Date('2024-01-15T20:00:00Z'),
      winner: 'BLUE',
      blueScore: 25,
      redScore: 18,
      duration: 42,
      blueTeam: {
        create: {
          name: 'Team Blue',
          side: 'BLUE',
          players: {
            create: [
              {
                pseudo: 'Gorki',
                role: 'ADC',
                champion: 'Jinx',
                kills: 12,
                deaths: 3,
                assists: 8,
                cs: 245,
                gold: 12500,
                damage: 18500,
              },
              {
                pseudo: 'Player2',
                role: 'SUPPORT',
                champion: 'Thresh',
                kills: 2,
                deaths: 4,
                assists: 15,
                cs: 45,
                gold: 8500,
                damage: 6500,
              },
              {
                pseudo: 'Player3',
                role: 'MID',
                champion: 'Orianna',
                kills: 8,
                deaths: 2,
                assists: 12,
                cs: 198,
                gold: 11200,
                damage: 15200,
              },
              {
                pseudo: 'Player4',
                role: 'JUNGLE',
                champion: 'Lee Sin',
                kills: 6,
                deaths: 5,
                assists: 10,
                cs: 89,
                gold: 9800,
                damage: 12800,
              },
              {
                pseudo: 'Player5',
                role: 'TOP',
                champion: 'Malphite',
                kills: 3,
                deaths: 6,
                assists: 14,
                cs: 156,
                gold: 9200,
                damage: 9800,
              },
            ],
          },
        },
      },
      redTeam: {
        create: {
          name: 'Team Red',
          side: 'RED',
          players: {
            create: [
              {
                pseudo: 'Enemy1',
                role: 'ADC',
                champion: 'Caitlyn',
                kills: 8,
                deaths: 4,
                assists: 6,
                cs: 198,
                gold: 10800,
                damage: 14200,
              },
              {
                pseudo: 'Enemy2',
                role: 'SUPPORT',
                champion: 'Blitzcrank',
                kills: 1,
                deaths: 7,
                assists: 12,
                cs: 38,
                gold: 7200,
                damage: 4800,
              },
              {
                pseudo: 'Enemy3',
                role: 'MID',
                champion: 'Zed',
                kills: 11,
                deaths: 3,
                assists: 4,
                cs: 167,
                gold: 11500,
                damage: 16800,
              },
              {
                pseudo: 'Enemy4',
                role: 'JUNGLE',
                champion: 'Graves',
                kills: 7,
                deaths: 4,
                assists: 8,
                cs: 95,
                gold: 10200,
                damage: 13500,
              },
              {
                pseudo: 'Enemy5',
                role: 'TOP',
                champion: 'Darius',
                kills: 5,
                deaths: 8,
                assists: 6,
                cs: 134,
                gold: 8900,
                damage: 11200,
              },
            ],
          },
        },
      },
    },
  })

  const game2 = await prisma.game.create({
    data: {
      name: 'Match Amical - Janvier',
      date: new Date('2024-01-10T19:30:00Z'),
      winner: 'RED',
      blueScore: 12,
      redScore: 28,
      duration: 35,
      blueTeam: {
        create: {
          name: 'Les Invincibles',
          side: 'BLUE',
          players: {
            create: [
              {
                pseudo: 'ProPlayer1',
                role: 'ADC',
                champion: 'Vayne',
                kills: 6,
                deaths: 5,
                assists: 4,
                cs: 189,
                gold: 9800,
                damage: 12800,
              },
              {
                pseudo: 'ProPlayer2',
                role: 'SUPPORT',
                champion: 'Nami',
                kills: 1,
                deaths: 6,
                assists: 8,
                cs: 42,
                gold: 6800,
                damage: 5200,
              },
              {
                pseudo: 'ProPlayer3',
                role: 'MID',
                champion: 'Syndra',
                kills: 4,
                deaths: 4,
                assists: 6,
                cs: 156,
                gold: 8900,
                damage: 11200,
              },
              {
                pseudo: 'ProPlayer4',
                role: 'JUNGLE',
                champion: 'Kha\'Zix',
                kills: 3,
                deaths: 7,
                assists: 5,
                cs: 78,
                gold: 7600,
                damage: 9800,
              },
              {
                pseudo: 'ProPlayer5',
                role: 'TOP',
                champion: 'Garen',
                kills: 2,
                deaths: 8,
                assists: 3,
                cs: 123,
                gold: 7200,
                damage: 8500,
              },
            ],
          },
        },
      },
      redTeam: {
        create: {
          name: 'Les Challengers',
          side: 'RED',
          players: {
            create: [
              {
                pseudo: 'Challenger1',
                role: 'ADC',
                champion: 'Ezreal',
                kills: 12,
                deaths: 2,
                assists: 8,
                cs: 201,
                gold: 12500,
                damage: 18500,
              },
              {
                pseudo: 'Challenger2',
                role: 'SUPPORT',
                champion: 'Leona',
                kills: 3,
                deaths: 4,
                assists: 15,
                cs: 45,
                gold: 8200,
                damage: 6800,
              },
              {
                pseudo: 'Challenger3',
                role: 'MID',
                champion: 'Ahri',
                kills: 9,
                deaths: 1,
                assists: 10,
                cs: 178,
                gold: 11200,
                damage: 15200,
              },
              {
                pseudo: 'Challenger4',
                role: 'JUNGLE',
                champion: 'Elise',
                kills: 8,
                deaths: 3,
                assists: 12,
                cs: 89,
                gold: 10200,
                damage: 13500,
              },
              {
                pseudo: 'Challenger5',
                role: 'TOP',
                champion: 'Renekton',
                kills: 6,
                deaths: 2,
                assists: 9,
                cs: 145,
                gold: 9800,
                damage: 12800,
              },
            ],
          },
        },
      },
    },
  })

  console.log('✅ Games créées')

  // Créer des picks/bans
  const picksBans = [
    // Game 1
    { gameId: game1.id, champion: 'Jinx', type: 'PICK', team: 'BLUE', order: 1 },
    { gameId: game1.id, champion: 'Caitlyn', type: 'PICK', team: 'RED', order: 2 },
    { gameId: game1.id, champion: 'Thresh', type: 'PICK', team: 'BLUE', order: 3 },
    { gameId: game1.id, champion: 'Blitzcrank', type: 'PICK', team: 'RED', order: 4 },
    { gameId: game1.id, champion: 'Orianna', type: 'PICK', team: 'BLUE', order: 5 },
    { gameId: game1.id, champion: 'Zed', type: 'PICK', team: 'RED', order: 6 },
    { gameId: game1.id, champion: 'Lee Sin', type: 'PICK', team: 'BLUE', order: 7 },
    { gameId: game1.id, champion: 'Graves', type: 'PICK', team: 'RED', order: 8 },
    { gameId: game1.id, champion: 'Malphite', type: 'PICK', team: 'BLUE', order: 9 },
    { gameId: game1.id, champion: 'Darius', type: 'PICK', team: 'RED', order: 10 },
  ]

  for (const pickBan of picksBans) {
    await prisma.pickBan.create({
      data: pickBan,
    })
  }

  console.log('✅ Picks/Bans créés')

  // Créer des clips de démonstration
  await prisma.clip.createMany({
    data: [
      {
        title: 'Triple Kill avec Jinx',
        blobUrl: 'https://example.com/clip1.mp4',
        gameId: game1.id,
        uploaderId: regularUser.id,
      },
      {
        title: 'Hook parfait de Thresh',
        blobUrl: 'https://example.com/clip2.mp4',
        gameId: game1.id,
        uploaderId: adminUser.id,
      },
      {
        title: 'Outplay de Zed',
        blobUrl: 'https://example.com/clip3.mp4',
        gameId: game2.id,
        uploaderId: regularUser.id,
      },
    ],
  })

  console.log('✅ Clips créés')

  console.log('🎉 Seeding terminé avec succès!')
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
