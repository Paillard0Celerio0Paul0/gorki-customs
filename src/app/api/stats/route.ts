import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Statistiques générales
    const totalGames = await prisma.game.count()
    const totalClips = await prisma.clip.count()
    const totalPlayers = await prisma.player.count()

    // Top 3 champions les plus joués
    const topChampions = await prisma.player.groupBy({
      by: ['champion'],
      _count: {
        champion: true
      },
      orderBy: {
        _count: {
          champion: 'desc'
        }
      },
      take: 3
    })

    const mostPlayedChampions = topChampions.map((champ, index) => ({
      rank: index + 1,
      name: champ.champion,
      picks: champ._count.champion
    }))

    // Statistiques des joueurs
    const playerStats = await prisma.player.findMany({
      include: {
        statistics: {
          include: {
            game: {
              include: {
                blueTeam: true,
                redTeam: true
              }
            }
          }
        },
        team: true
      }
    })

    const playerStatsFormatted = playerStats.map(player => {
      const totalKills = player.statistics.reduce((sum, stat) => sum + stat.kills, 0)
      const totalDeaths = player.statistics.reduce((sum, stat) => sum + stat.deaths, 0)
      const totalAssists = player.statistics.reduce((sum, stat) => sum + stat.assists, 0)
      const games = player.statistics.length
      
      // Calculer les victoires en vérifiant si l'équipe du joueur a gagné
      const wins = player.statistics.filter(stat => {
        const game = stat.game
        const playerTeamSide = player.team.side
        return game.winner === playerTeamSide
      }).length
      
      return {
        pseudo: player.pseudo,
        games,
        wins,
        kills: totalKills,
        deaths: totalDeaths,
        assists: totalAssists,
        kda: totalDeaths > 0 ? (totalKills + totalAssists) / totalDeaths : totalKills + totalAssists
      }
    })

    // Statistiques des champions (basées sur les joueurs)
    const championStats = await prisma.player.groupBy({
      by: ['champion'],
      _count: {
        champion: true
      }
    })

    const championStatsFormatted = championStats.map(champ => ({
      name: champ.champion,
      picks: champ._count.champion,
      wins: 0, // Pour l'instant, on ne peut pas calculer les victoires par champion facilement
      winrate: 0 // Pour l'instant, on ne peut pas calculer le winrate par champion facilement
    }))

    // Statistiques mensuelles (simulées pour l'instant)
    const monthlyStats = [
      { month: 'Jan 2024', games: 0, clips: 0 },
      { month: 'Fév 2024', games: 0, clips: 0 },
      { month: 'Mar 2024', games: 0, clips: 0 },
      { month: 'Avr 2024', games: 0, clips: 0 },
      { month: 'Mai 2024', games: 0, clips: 0 },
      { month: 'Juin 2024', games: 0, clips: 0 }
    ]

    return NextResponse.json({
      totalGames,
      totalClips,
      totalPlayers,
      mostPlayedChampions,
      playerStats: playerStatsFormatted,
      championStats: championStatsFormatted,
      monthlyStats
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error)
    return NextResponse.json({ error: 'Erreur lors de la récupération des statistiques' }, { status: 500 })
  }
}
