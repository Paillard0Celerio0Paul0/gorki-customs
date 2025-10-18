'use client'

import { useSession } from 'next-auth/react'

export default function DebugPage() {
  const { data: session, status } = useSession()

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Debug - Configuration OAuth</h1>
      
      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h2 className="font-semibold">Statut de Session</h2>
          <p>Status: {status}</p>
          <pre className="mt-2 text-sm bg-gray-100 p-2 rounded">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-semibold">Variables d'Environnement (côté client)</h2>
          <p>NEXTAUTH_URL: {process.env.NEXT_PUBLIC_NEXTAUTH_URL || 'Non définie (normal)'}</p>
          <p>NODE_ENV: {process.env.NODE_ENV}</p>
          <p className="text-sm text-gray-600 mt-2">
            Note: NEXTAUTH_URL n'est pas exposée côté client par défaut pour des raisons de sécurité
          </p>
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-semibold">Test de Connexion Discord</h2>
          <div className="space-y-2">
            <a 
              href="/api/auth/signin/discord" 
              className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center"
            >
              🔗 Connexion Discord Directe
            </a>
            <a 
              href="/auth/signin" 
              className="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-center"
            >
              🔗 Page de Connexion Normale
            </a>
            <div className="text-sm text-gray-600 mt-4">
              <p><strong>Si l'erreur persiste :</strong></p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Vérifiez l'URL de redirection dans Discord Developer Portal</li>
                <li>L'URL doit être exactement : <code>https://gorki-customs.vercel.app/api/auth/callback/discord</code></li>
                <li>Pas d'espaces avant/après l'URL</li>
                <li>Application Discord activée</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
