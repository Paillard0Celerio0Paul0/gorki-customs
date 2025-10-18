'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Gamepad2, Search, Calendar, Users, Trophy, Clock } from 'lucide-react'
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
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([])
  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBy, setFilterBy] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  // Données de démonstration
  useEffect(() => {

  }, [])

  useEffect(() => {
    let filtered = games

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.blueTeam.players.some(p => p.pseudo.toLowerCase().includes(searchTerm.toLowerCase())) ||
        game.redTeam.players.some(p => p.pseudo.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filtre par type
    if (filterBy === 'recent') {
      filtered = filtered.filter(game => {
        const gameDate = new Date(game.date)
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return gameDate > weekAgo
      })
    } else if (filterBy === 'blue-wins') {
      filtered = filtered.filter(game => game.winner === 'BLUE')
    } else if (filterBy === 'red-wins') {
      filtered = filtered.filter(game => game.winner === 'RED')
    }

    setFilteredGames(filtered)
  }, [games, searchTerm, filterBy])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
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
        <h1 className="text-3xl font-bold mb-2 neon-text">Custom Games</h1>
        <p className="text-muted-foreground">
          Découvrez toutes les custom games League of Legends de la communauté
        </p>
      </motion.div>

      {/* Filtres */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom de game ou joueur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterBy} onValueChange={setFilterBy}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filtrer par..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les games</SelectItem>
            <SelectItem value="recent">Récentes (7 jours)</SelectItem>
            <SelectItem value="blue-wins">Victoires Bleu</SelectItem>
            <SelectItem value="red-wins">Victoires Rouge</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Liste des games */}
      <div className="space-y-6">
        {filteredGames.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Gamepad2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucune game trouvée</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Essayez de modifier vos critères de recherche.' : 'Aucune custom game n\'a encore été ajoutée.'}
            </p>
          </motion.div>
        ) : (
          filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="hover:neon-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{game.name}</CardTitle>
                      <CardDescription className="flex items-center space-x-4 mt-2">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(game.date)}</span>
                        </span>
                        {game.duration && (
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{game.duration} min</span>
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    <Badge variant={game.winner === 'BLUE' ? 'default' : 'secondary'}>
                      <Trophy className="h-3 w-3 mr-1" />
                      {game.winner === 'BLUE' ? 'Victoire Bleu' : 'Victoire Rouge'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Team Blue */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-primary">Team Bleu</h4>
                        <span className="text-2xl font-bold text-primary">{game.blueScore}</span>
                      </div>
                      <div className="space-y-2">
                        {game.blueTeam.players.map((player, i) => (
                          <div key={i} className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{player.pseudo}</span>
                              <Badge variant="outline" className="text-xs">
                                {player.role}
                              </Badge>
                            </div>
                            <span className="text-muted-foreground">{player.champion}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Team Red */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-destructive">Team Rouge</h4>
                        <span className="text-2xl font-bold text-destructive">{game.redScore}</span>
                      </div>
                      <div className="space-y-2">
                        {game.redTeam.players.map((player, i) => (
                          <div key={i} className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{player.pseudo}</span>
                              <Badge variant="outline" className="text-xs">
                                {player.role}
                              </Badge>
                            </div>
                            <span className="text-muted-foreground">{player.champion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <Button asChild className="w-full">
                      <Link href={`/games/${game.id}`}>
                        <Users className="h-4 w-4 mr-2" />
                        Voir les détails
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
