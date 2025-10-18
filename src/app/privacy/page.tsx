import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Eye, Database, Trash2, Mail, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PrivacyPage() {
  const sections = [
    {
      icon: Eye,
      title: 'Collecte des Données',
      content: [
        'Nous collectons uniquement les données nécessaires au bon fonctionnement de la plateforme :',
        '• Email Discord (pour l\'authentification)',
        '• Nom d\'utilisateur Discord',
        '• Avatar Discord',
        '• Statistiques de jeu (KDA, victoires, défaites)',
        '• Clips vidéo uploadés par les utilisateurs'
      ]
    },
    {
      icon: Database,
      title: 'Utilisation des Données',
      content: [
        'Vos données sont utilisées pour :',
        '• Authentification via Discord',
        '• Affichage de votre profil et statistiques',
        '• Assignation de rôles utilisateur/admin',
        '• Fonctionnement des fonctionnalités de la plateforme',
        '• Amélioration de l\'expérience utilisateur'
      ]
    },
    {
      icon: Shield,
      title: 'Partage des Données',
      content: [
        'Vos données peuvent être partagées avec :',
        '• Vercel (hébergement de la plateforme)',
        '• Discord (authentification OAuth)',
        '• PostgreSQL (stockage des données)',
        '• GitHub (déploiement du code)',
        'Nous ne vendons jamais vos données à des tiers.'
      ]
    },
    {
      icon: Trash2,
      title: 'Conservation des Données',
      content: [
        'Vos données sont conservées jusqu\'à :',
        '• Demande de suppression de votre part',
        '• Suppression de votre compte Discord',
        '• Fermeture de la plateforme',
        'Vous pouvez demander la suppression de vos données à tout moment.'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"
            >
              <Shield className="h-8 w-8 text-primary" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 neon-text">
              Politique de Confidentialité
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Comment nous protégeons et utilisons vos données
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Badge variant="outline" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</span>
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="mb-8 neon-glow">
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
              <CardDescription>
                Cette politique de confidentialité décrit comment Gorki Custom collecte, utilise et protège vos informations personnelles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nous nous engageons à protéger votre vie privée et à être transparents sur l'utilisation de vos données. 
                Cette plateforme est développée par l'équipe Discord "Les bobziniens gorki" et est hébergée sur Vercel.
              </p>
            </CardContent>
          </Card>

          {/* Sections principales */}
          <div className="grid gap-8 mb-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="hover:neon-glow transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <section.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Cookies et Technologies */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Cookies et Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Nous utilisons les technologies suivantes :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">NextAuth</h4>
                  <p className="text-sm text-muted-foreground">
                    Gestion de l'authentification et des sessions utilisateur
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Vercel Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Analyse anonyme de l'utilisation de la plateforme
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Contact</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Pour toute question concernant cette politique de confidentialité ou pour demander la suppression de vos données :
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium">Email : paul.paillard01@gmail.com</p>
                <p className="text-sm text-muted-foreground">
                  Discord : Les bobziniens gorki
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Modifications */}
          <Card>
            <CardHeader>
              <CardTitle>Modifications de cette Politique</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                Les modifications seront publiées sur cette page avec une nouvelle date de mise à jour.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
