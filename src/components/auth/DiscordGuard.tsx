'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

interface DiscordGuardProps {
  children: ReactNode
  fallback?: ReactNode
}

export function DiscordGuard({ children, fallback }: DiscordGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // En cours de chargement

    if (!session) {
      router.push('/auth/signin')
      return
    }

    if (session.user?.provider !== 'discord') {
      // Forcer la déconnexion et rediriger
      signOut({ callbackUrl: '/auth/signin' })
    }
  }, [session, status, router])

  // En cours de chargement
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Pas connecté
  if (!session) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <span>Connexion requise</span>
            </CardTitle>
            <CardDescription>
              Vous devez être connecté pour accéder à cette page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href="/auth/signin">Se connecter</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Connecté mais pas via Discord
  if (session.user?.provider !== 'discord') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <span>Connexion Discord requise</span>
            </CardTitle>
            <CardDescription>
              Cette fonctionnalité nécessite une connexion via Discord
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              L'upload de clips est réservé aux utilisateurs connectés via Discord.
            </p>
            <Button asChild className="w-full">
              <a href="/auth/signin">Se connecter avec Discord</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Connecté via Discord - afficher le contenu
  return <>{children}</>
}
