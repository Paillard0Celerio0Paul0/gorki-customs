'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Gamepad2, 
  Upload, 
  Users, 
  TrendingUp, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Trophy
} from 'lucide-react'
import { motion } from 'framer-motion'

interface DashboardStats {
  totalGames: number
  totalClips: number
  totalUsers: number
  recentGames: Array<{
    id: string
    name: string
    date: string
    winner: 'BLUE' | 'RED'
    blueScore: number
    redScore: number
  }>
}

export default function AdminDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalGames: 0,
    totalClips: 0,
    totalUsers: 0,
    recentGames: []
  })
  const [isLoading, setIsLoading] = useState(false)

 

  // Vérifier les permissions admin
  useEffect(() => {
    if (session && session.user?.role !== 'ADMIN') {
      router.push('/games')
    }
  }, [session, router])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
        <p className="text-muted-foreground">Vous devez être administrateur pour accéder à cette page.</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 neon-text">Dashboard Admin</h1>
            <p className="text-muted-foreground">
              Gérez les custom games et supervisez l'activité de la plateforme
            </p>
          </div>
          <Button asChild className="neon-glow">
            <Link href="/admin/games/new">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Game
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Statistiques */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <Card className="hover:neon-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Games</CardTitle>
            <Gamepad2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold neon-text">{stats.totalGames}</div>
            <p className="text-xs text-muted-foreground">
              +2 depuis la semaine dernière
            </p>
          </CardContent>
        </Card>

        <Card className="hover:neon-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clips Uploadés</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold neon-text">{stats.totalClips}</div>
            <p className="text-xs text-muted-foreground">
              +12 cette semaine
            </p>
          </CardContent>
        </Card>

        <Card className="hover:neon-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold neon-text">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +5 nouveaux utilisateurs
            </p>
          </CardContent>
        </Card>

        <Card className="hover:neon-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activité</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold neon-text">+24%</div>
            <p className="text-xs text-muted-foreground">
              vs mois dernier
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Actions rapides */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
            <CardDescription>
              Accès direct aux fonctionnalités d'administration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild variant="outline" className="h-auto p-6">
                <Link href="/admin/games" className="flex flex-col items-center space-y-2">
                  <Gamepad2 className="h-8 w-8" />
                  <span>Gérer les Games</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-6">
                <Link href="/admin/users" className="flex flex-col items-center space-y-2">
                  <Users className="h-8 w-8" />
                  <span>Gérer les Utilisateurs</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-6">
                <Link href="/admin/clips" className="flex flex-col items-center space-y-2">
                  <Upload className="h-8 w-8" />
                  <span>Modérer les Clips</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Games récentes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Games Récentes</CardTitle>
                <CardDescription>
                  Dernières custom games ajoutées à la plateforme
                </CardDescription>
              </div>
              <Button asChild variant="outline">
                <Link href="/admin/games">Voir tout</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formatDate(game.date)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">{game.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Trophy className="h-3 w-3" />
                        <span>
                          {game.winner === 'BLUE' ? 'Victoire Bleu' : 'Victoire Rouge'} 
                          ({game.blueScore} - {game.redScore})
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/games/${game.id}`}>
                        <Eye className="h-3 w-3 mr-1" />
                        Voir
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/games/${game.id}/edit`}>
                        <Edit className="h-3 w-3 mr-1" />
                        Éditer
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
