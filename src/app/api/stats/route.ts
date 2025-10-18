import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Statistiques des joueurs
    const playerStats = await prisma.player.findMany({
      include: {
        statistics: true
      }
    })

    const playerStatsFormatted = playerStats.map(player => {
      const totalKills = player.statistics.reduce((sum, stat) => sum + stat.kills, 0)
      const totalDeaths = player.statistics.reduce((sum, stat) => sum + stat.deaths, 0)
      const totalAssists = player.statistics.reduce((sum, stat) => sum + stat.assists, 0)
      const games = player.statistics.length
      const wins = player.statistics.filter(stat => stat.win).length
      
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

    // Statistiques des champions
    const championStats = await prisma.statistic.groupBy({
      by: ['champion'],
      _count: {
        champion: true
      },
      _sum: {
        win: true
      }
    })

    const championStatsFormatted = championStats.map(champ => ({
      name: champ.champion,
      picks: champ._count.champion,
      wins: champ._sum.win || 0,
      winrate: champ._count.champion > 0 ? ((champ._sum.win || 0) / champ._count.champion) * 100 : 0
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
      playerStats: playerStatsFormatted,
      championStats: championStatsFormatted,
      monthlyStats
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error)
    return NextResponse.json({ error: 'Erreur lors de la récupération des statistiques' }, { status: 500 })
  }
}
