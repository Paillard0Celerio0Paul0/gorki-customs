'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Gamepad2, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Users,
  Trophy
} from 'lucide-react'
import { motion } from 'framer-motion'

interface Game {
  id: string
  name: string
  date: string
  blueTeam: {
    name: string
    players: Array<{
      pseudo: string
      champion: string
      role: string
    }>
  }
  redTeam: {
    name: string
    players: Array<{
      pseudo: string
      champion: string
      role: string
    }>
  }
  blueScore: number
  redScore: number
  winner: 'BLUE' | 'RED'
  duration?: number
  clipsCount: number
}

export default function AdminGamesPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [games, setGames] = useState<Game[]>([])
  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Filtre par recherche
  useEffect(() => {
    if (searchTerm) {
      const filtered = games.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.blueTeam.players.some(p => p.pseudo.toLowerCase().includes(searchTerm.toLowerCase())) ||
        game.redTeam.players.some(p => p.pseudo.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      setFilteredGames(filtered)
    } else {
      setFilteredGames(games)
    }
  }, [games, searchTerm])

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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleDeleteGame = async (gameId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette game ?')) {
      // TODO: Implémenter la suppression
      console.log('Suppression de la game:', gameId)
    }
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
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-muted rounded-lg" />
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
            <h1 className="text-3xl font-bold mb-2 neon-text">Gestion des Games</h1>
            <p className="text-muted-foreground">
              Gérez toutes les custom games de la plateforme
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

      {/* Filtres */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-6"
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom de game ou joueur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Badge variant="secondary">
                {filteredGames.length} game{filteredGames.length > 1 ? 's' : ''}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tableau des games */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Liste des Games</CardTitle>
            <CardDescription>
              Toutes les custom games enregistrées sur la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Game</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Équipes</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Clips</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGames.map((game, index) => (
                  <motion.tr
                    key={game.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="hover:bg-muted/50"
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{game.name}</div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(game.date)}</span>
                          {game.duration && (
                            <>
                              <span>•</span>
                              <span>{game.duration} min</span>
                            </>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center space-x-1">
                          <Trophy className="h-3 w-3" />
                          <span>
                            {game.winner === 'BLUE' ? 'Victoire Bleu' : 'Victoire Rouge'}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="text-primary font-medium">{game.blueTeam.name}</span>
                          <span className="text-muted-foreground"> vs </span>
                          <span className="text-destructive font-medium">{game.redTeam.name}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {game.blueTeam.players.length + game.redTeam.players.length} joueurs
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="text-lg font-bold">
                          <span className="text-primary">{game.blueScore}</span>
                          <span className="mx-2">-</span>
                          <span className="text-destructive">{game.redScore}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {game.clipsCount} clip{game.clipsCount > 1 ? 's' : ''}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/games/${game.id}`}>
                            <Eye className="h-3 w-3" />
                          </Link>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/games/${game.id}/edit`}>
                            <Edit className="h-3 w-3" />
                          </Link>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteGame(game.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>

            {filteredGames.length === 0 && (
              <div className="text-center py-12">
                <Gamepad2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucune game trouvée</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'Essayez de modifier vos critères de recherche.' : 'Commencez par créer votre première custom game.'}
                </p>
                {!searchTerm && (
                  <Button asChild>
                    <Link href="/admin/games/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Créer une Game
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
