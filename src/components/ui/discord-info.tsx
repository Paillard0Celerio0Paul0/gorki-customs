'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Shield } from 'lucide-react'
import Link from 'next/link'

export function DiscordInfo() {
  const { data: session } = useSession()

  if (session?.user?.provider === 'discord') {
    return (
      <Card className="border-green-500/20 bg-green-500/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-500">
            <Shield className="h-5 w-5" />
            <span>Connexion Discord active</span>
          </CardTitle>
          <CardDescription>
            Vous êtes connecté via Discord et pouvez uploader des clips
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
              Discord
            </Badge>
            <span className="text-sm text-muted-foreground">
              {session.user.name}
            </span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-amber-500/20 bg-amber-500/5">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-amber-500">
          <AlertCircle className="h-5 w-5" />
          <span>Connexion Discord requise</span>
        </CardTitle>
        <CardDescription>
          L'upload de clips nécessite une connexion via Discord
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Pour uploader des clips vidéo, vous devez vous connecter avec votre compte Discord.
          </p>
          <Button asChild className="w-full">
            <Link href="/auth/signin">
              Se connecter avec Discord
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
