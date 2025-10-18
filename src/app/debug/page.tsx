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
          <p>NEXTAUTH_URL: {process.env.NEXT_PUBLIC_NEXTAUTH_URL || 'Non définie'}</p>
          <p>NODE_ENV: {process.env.NODE_ENV}</p>
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-semibold">URLs de Test</h2>
          <div className="space-y-2">
            <a 
              href="/api/auth/signin/discord" 
              className="block text-blue-500 hover:underline"
            >
              Connexion Discord Directe
            </a>
            <a 
              href="/api/auth/csrf" 
              className="block text-blue-500 hover:underline"
            >
              Token CSRF
            </a>
            <a 
              href="/api/auth/providers" 
              className="block text-blue-500 hover:underline"
            >
              Providers Disponibles
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
