import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { put } from '@vercel/blob'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification et le provider Discord
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    if (session.user.provider !== 'discord') {
      return NextResponse.json({ error: 'Connexion Discord requise pour uploader des clips' }, { status: 403 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const gameId = formData.get('gameId') as string

    if (!file || !title || !gameId) {
      return NextResponse.json(
        { error: 'Fichier, titre et game ID requis' },
        { status: 400 }
      )
    }

    // Vérifier que la game existe
    const game = await prisma.game.findUnique({
      where: { id: gameId }
    })

    if (!game) {
      return NextResponse.json(
        { error: 'Game non trouvée' },
        { status: 404 }
      )
    }

    // Générer un nom de fichier unique
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const fileName = `clips/${gameId}/${timestamp}-${title.replace(/[^a-zA-Z0-9]/g, '-')}.${fileExtension}`

    // Upload vers Vercel Blob
    const blob = await put(fileName, file, {
      access: 'public',
    })

    // Sauvegarder en base de données
    const clip = await prisma.clip.create({
      data: {
        title,
        blobUrl: blob.url,
        gameId,
        uploaderId: session.user.id,
      }
    })

    return NextResponse.json({
      success: true,
      clip: {
        id: clip.id,
        title: clip.title,
        blobUrl: clip.blobUrl,
        gameId: clip.gameId,
        createdAt: clip.createdAt,
      }
    })

  } catch (error) {
    console.error('Erreur upload clip:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de l\'upload' },
      { status: 500 }
    )
  }
}
