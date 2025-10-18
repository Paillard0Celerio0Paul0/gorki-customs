'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Users, Upload, Shield, AlertTriangle, Mail, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TermsPage() {
  const sections = [
    {
      icon: Users,
      title: 'Acceptation des Conditions',
      content: [
        'En utilisant Gorki Custom, vous acceptez ces conditions d\'utilisation.',
        'Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser notre plateforme.',
        'Ces conditions s\'appliquent à tous les utilisateurs de la plateforme.',
        'Nous nous réservons le droit de modifier ces conditions à tout moment.'
      ]
    },
    {
      icon: Upload,
      title: 'Utilisation de la Plateforme',
      content: [
        'La plateforme est gratuite et destinée à la communauté League of Legends.',
        'Vous devez vous connecter via Discord pour accéder aux fonctionnalités.',
        'Vous pouvez uploader des clips vidéo de vos parties League of Legends.',
        'Vous êtes responsable du contenu que vous uploadez.'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Responsabilités de l\'Utilisateur',
      content: [
        'Vous êtes responsable de tous les clips vidéo que vous uploadez.',
        'Le contenu doit être lié à League of Legends uniquement.',
        'Pas de contenu inapproprié, offensant ou illégal.',
        'Respectez les droits d\'auteur et les marques déposées de Riot Games.',
        'L\'équipe d\'administration se réserve le droit de modérer le contenu.'
      ]
    },
    {
      icon: Shield,
      title: 'Limitations de Responsabilité',
      content: [
        'La plateforme est fournie "en l\'état" sans garantie.',
        'Nous ne sommes pas responsables des dommages directs ou indirects.',
        'Pas de garantie de disponibilité continue de la plateforme.',
        'Nous ne sommes pas responsables des pertes de données.',
        'Chaque utilisateur utilise la plateforme à ses propres risques.'
      ]
    }
  ]

  const rules = [
    'Respectez les autres utilisateurs de la communauté',
    'Ne uploadez que du contenu lié à League of Legends',
    'Pas de contenu haineux, discriminatoire ou offensant',
    'Respectez les droits d\'auteur de Riot Games',
    'Ne tentez pas de contourner les mesures de sécurité',
    'Signalez tout comportement inapproprié aux administrateurs'
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
              <FileText className="h-8 w-8 text-primary" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 neon-text">
              Conditions d'Utilisation
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Règles et conditions pour utiliser Gorki Custom
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
                Ces conditions d'utilisation régissent votre utilisation de la plateforme Gorki Custom.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Gorki Custom est une plateforme gratuite développée par l'équipe Discord "Les bobziniens gorki" 
                pour la communauté League of Legends. En utilisant notre service, vous acceptez ces conditions.
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

          {/* Règles de la Communauté */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Règles de la Communauté</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Pour maintenir une communauté saine et respectueuse :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {rules.map((rule, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-sm text-muted-foreground">{rule}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contenu et Droits d'Auteur */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Contenu et Droits d'Auteur</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Contenu Utilisateur</h4>
                  <p className="text-muted-foreground">
                    Vous conservez tous les droits sur les clips vidéo que vous uploadez. 
                    En uploadant du contenu, vous nous accordez le droit d'héberger et d'afficher ce contenu sur la plateforme.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">League of Legends</h4>
                  <p className="text-muted-foreground">
                    League of Legends et tous les éléments associés sont des marques déposées de Riot Games, Inc. 
                    Cette plateforme n'est pas affiliée à Riot Games et respecte leurs conditions d'utilisation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Modération */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Modération et Sanctions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  L'équipe d'administration se réserve le droit de :
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Modérer tout contenu uploadé</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Supprimer du contenu inapproprié</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Restreindre l'accès aux utilisateurs qui violent ces conditions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">Modifier ces conditions d'utilisation</span>
                  </li>
                </ul>
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
                Pour toute question concernant ces conditions d'utilisation :
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium">Email : paul.paillard01@gmail.com</p>
                <p className="text-sm text-muted-foreground">
                  Discord : Les bobziniens gorki
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Clôture */}
          <Card>
            <CardHeader>
              <CardTitle>Acceptation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                En utilisant Gorki Custom, vous confirmez avoir lu, compris et accepté ces conditions d'utilisation. 
                Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre plateforme.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
