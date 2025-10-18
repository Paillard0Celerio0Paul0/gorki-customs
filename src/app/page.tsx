'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DiscordInfo } from '@/components/ui/discord-info'
import { Gamepad2, Upload, BarChart3, Users, Trophy, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

interface HomeStats {
  totalGames: number
  totalClips: number
  totalPlayers: number
  totalWins: number
}

export default function Home() {
  const [stats, setStats] = useState<HomeStats>({
    totalGames: 0,
    totalClips: 0,
    totalPlayers: 0,
    totalWins: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  // Charger les statistiques depuis l'API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/stats')
        if (response.ok) {
          const data = await response.json()
          
          // Calculer le nombre total de victoires
          const totalWins = data.playerStats?.reduce((sum: number, player: any) => sum + player.wins, 0) || 0
          
          setStats({
            totalGames: data.totalGames || 0,
            totalClips: data.totalClips || 0,
            totalPlayers: data.totalPlayers || 0,
            totalWins: totalWins
          })
        } else {
          console.error('Erreur lors du chargement des statistiques')
        }
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const features = [
    {
      icon: Gamepad2,
      title: 'Gestion des Games',
      description: 'Suivez toutes vos custom games League of Legends avec des statistiques détaillées.',
    },
    {
      icon: Upload,
      title: 'Upload de Clips',
      description: 'Partagez vos meilleurs moments en uploadant des clips vidéo directement sur la plateforme.',
    },
    {
      icon: BarChart3,
      title: 'Statistiques Avancées',
      description: 'Analysez les performances avec des graphiques interactifs et des classements.',
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Rejoignez une communauté de joueurs passionnés de League of Legends.',
    },
  ]

  const statsData = [
    { label: 'Games Jouées', value: stats.totalGames.toLocaleString(), icon: Gamepad2 },
    { label: 'Clips Uploadés', value: stats.totalClips.toLocaleString(), icon: Upload },
    { label: 'Joueurs Actifs', value: stats.totalPlayers.toLocaleString(), icon: Users },
    { label: 'Victoires', value: stats.totalWins.toLocaleString(), icon: Trophy },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 neon-text">
              Gorki Custom
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              La plateforme ultime pour gérer vos custom games League of Legends 
              et partager vos meilleurs clips avec la communauté.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="neon-glow">
                <Link href="/games">Voir les Games</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/upload">Uploader un Clip</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold neon-text">
                  {isLoading ? (
                    <div className="animate-pulse bg-muted rounded h-8 w-16 mx-auto"></div>
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fonctionnalités Principales
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez toutes les fonctionnalités qui font de Gorki Custom 
              la plateforme de référence pour les custom games.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:neon-glow transition-all duration-300">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Discord Info Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <DiscordInfo />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à Commencer ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Rejoignez la communauté et commencez à suivre vos custom games 
              dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="neon-glow">
                <Link href="/auth/signin">Se Connecter avec Discord</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/games">Explorer</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
