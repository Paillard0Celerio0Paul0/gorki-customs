import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test de connexion à la base de données
    await prisma.$connect()
    
    // Test de création d'un utilisateur (sans le sauvegarder)
    const testUser = {
      email: 'test@example.com',
      name: 'Test User',
      role: 'USER' as const,
      emailVerified: new Date(),
    }

    // Vérifier que le schéma est correct
    const userCount = await prisma.user.count()
    
    return NextResponse.json({
      success: true,
      message: 'Base de données accessible',
      userCount,
      testUser,
    })
  } catch (error) {
    console.error('Erreur base de données:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      details: error,
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
