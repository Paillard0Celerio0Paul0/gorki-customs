import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const games = await prisma.game.findMany({
      include: {
        blueTeam: {
          include: {
            players: true
          }
        },
        redTeam: {
          include: {
            players: true
          }
        },
        clips: true,
        picksBans: true,
        statistics: true
      },
      orderBy: {
        date: 'desc'
      }
    })

    return NextResponse.json(games)
  } catch (error) {
    console.error('Erreur lors de la récupération des games:', error)
    return NextResponse.json({ error: 'Erreur lors de la récupération des games' }, { status: 500 })
  }
}
