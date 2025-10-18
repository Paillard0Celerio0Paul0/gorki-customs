'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'
import { 
  TrendingUp, 
  Users, 
  Trophy, 
  Target,
  Gamepad2,
  Crown,
  Zap
} from 'lucide-react'
import { motion } from 'framer-motion'

interface PlayerStats {
  pseudo: string
  games: number
  wins: number
  kills: number
  deaths: number
  assists: number
  kda: number
}

interface ChampionStats {
  name: string
  picks: number
  wins: number
  winrate: number
}

interface MonthlyStats {
  month: string
  games: number
  clips: number
}

export default function StatsPage() {
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([])
  const [championStats, setChampionStats] = useState<ChampionStats[]>([])
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([])
  const [isLoading, setIsLoading] = useState(true)


  const COLORS = ['#00d4ff', '#7c3aed', '#ef4444', '#10b981', '#f59e0b']

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-muted rounded-lg" />
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
        <h1 className="text-3xl font-bold mb-2 neon-text">Statistiques</h1>
        <p className="text-muted-foreground">
          Analysez les performances et découvrez les tendances de la communauté
        </p>
      </motion.div>

      {/* Statistiques générales */}
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
            <div className="text-2xl font-bold neon-text">69</div>
            <p className="text-xs text-muted-foreground">
              +12% depuis le mois dernier
            </p>
          </CardContent>
        </Card>

        <Card className="hover:neon-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Joueurs Actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold neon-text">89</div>
            <p className="text-xs text-muted-foreground">
              +8 nouveaux joueurs
            </p>
          </CardContent>
        </Card>

        <Card className="hover:neon-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clips Uploadés</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold neon-text">253</div>
            <p className="text-xs text-muted-foreground">
              +23 cette semaine
            </p>
          </CardContent>
        </Card>

        <Card className="hover:neon-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Winrate Moyen</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold neon-text">67%</div>
            <p className="text-xs text-muted-foreground">
              +5% vs mois dernier
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Évolution mensuelle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Évolution Mensuelle</span>
              </CardTitle>
              <CardDescription>
                Nombre de games et clips par mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="games" 
                    stroke="#00d4ff" 
                    strokeWidth={2}
                    name="Games"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clips" 
                    stroke="#7c3aed" 
                    strokeWidth={2}
                    name="Clips"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Champions les plus joués */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Crown className="h-5 w-5" />
                <span>Champions Populaires</span>
              </CardTitle>
              <CardDescription>
                Top 5 des champions les plus joués
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={championStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, picks }) => `${name} (${picks})`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="picks"
                  >
                    {championStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Classements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Joueurs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Top Joueurs</span>
              </CardTitle>
              <CardDescription>
                Classement par KDA moyen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {playerStats.map((player, index) => (
                  <motion.div
                    key={player.pseudo}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <span className="text-sm font-bold text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{player.pseudo}</div>
                        <div className="text-sm text-muted-foreground">
                          {player.games} games • {player.wins} victoires
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold neon-text">{player.kda.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">KDA</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Champions par Winrate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Champions par Winrate</span>
              </CardTitle>
              <CardDescription>
                Performance des champions les plus joués
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {championStats.map((champion, index) => (
                  <motion.div
                    key={champion.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10">
                        <span className="text-sm font-bold text-accent">
                          {champion.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{champion.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {champion.picks} picks • {champion.wins} victoires
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold neon-text">{champion.winrate}%</div>
                      <div className="text-sm text-muted-foreground">Winrate</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
