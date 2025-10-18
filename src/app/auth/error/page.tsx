'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'

const errorMessages = {
  Configuration: 'Il y a un problème avec la configuration du serveur.',
  AccessDenied: 'Accès refusé. Vous avez annulé la connexion.',
  Verification: 'Le token a expiré ou a déjà été utilisé.',
  Default: 'Une erreur inattendue s\'est produite.',
  Callback: 'Erreur lors du callback OAuth. Vérifiez la configuration Discord.',
}

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error') as keyof typeof errorMessages

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <span>Erreur de Connexion</span>
            </CardTitle>
            <CardDescription>
              {errorMessages[error] || errorMessages.Default}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error === 'Callback' && (
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                <h4 className="font-medium text-amber-800 mb-2">Diagnostic de l'erreur Callback :</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Vérifiez que l'URL de redirection Discord est correcte</li>
                  <li>• Assurez-vous que la base de données est accessible</li>
                  <li>• Vérifiez les variables d'environnement Vercel</li>
                  <li>• L'application Discord doit être activée</li>
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/auth/signin">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Réessayer la Connexion
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full">
                <Link href="/debug">
                  Page de Debug
                </Link>
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>Erreur: <code className="bg-gray-100 px-1 rounded">{error}</code></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
