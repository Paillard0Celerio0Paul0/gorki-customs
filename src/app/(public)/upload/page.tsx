'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { DiscordGuard } from '@/components/auth/DiscordGuard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Upload, Video, CheckCircle, AlertCircle, Gamepad2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface Game {
  id: string
  name: string
  date: string
}

export default function UploadPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [games, setGames] = useState<Game[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedGameId, setSelectedGameId] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  // Données de démonstration
  useEffect(() => {
    const demoGames: Game[] = [
      { id: '1', name: 'Finale Tournoi Hiver 2024', date: '2024-01-15T20:00:00Z' },
      { id: '2', name: 'Match Amical - Janvier', date: '2024-01-10T19:30:00Z' },
    ]
    setGames(demoGames)
  }, [])


  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Vérifier la taille du fichier (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        setError('Le fichier est trop volumineux. Taille maximale : 100MB')
        return
      }

      // Vérifier le type de fichier
      if (!file.type.startsWith('video/')) {
        setError('Veuillez sélectionner un fichier vidéo')
        return
      }

      setSelectedFile(file)
      setError('')
      
      // Auto-remplir le titre si vide
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ''))
      }
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedFile || !title || !selectedGameId) {
      setError('Veuillez remplir tous les champs obligatoires')
      return
    }

    setIsUploading(true)
    setUploadStatus('uploading')
    setUploadProgress(0)

    try {
      // Simuler l'upload avec progression
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Appel API pour uploader vers Vercel Blob
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('title', title)
      formData.append('description', description)
      formData.append('gameId', selectedGameId)

      const response = await fetch('/api/clips/upload', {
        method: 'POST',
        body: formData,
      })

      clearInterval(interval)
      setUploadProgress(100)

      if (!response.ok) {
        throw new Error('Erreur lors de l\'upload')
      }

      const result = await response.json()
      
      setUploadStatus('success')
      
      // Rediriger vers la page de la game après 2 secondes
      setTimeout(() => {
        router.push(`/games/${selectedGameId}`)
      }, 2000)

    } catch (error) {
      console.error('Erreur upload:', error)
      setUploadStatus('error')
      setError('Erreur lors de l\'upload du clip. Veuillez réessayer.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <DiscordGuard>
      <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 neon-text">Upload de Clip</h1>
          <p className="text-muted-foreground">
            Partagez vos meilleurs moments de League of Legends avec la communauté
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Nouveau Clip</span>
            </CardTitle>
            <CardDescription>
              Sélectionnez un fichier vidéo et associez-le à une custom game
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-6">
              {/* Sélection de fichier */}
              <div className="space-y-2">
                <Label htmlFor="file">Fichier vidéo *</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input
                    id="file"
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <label htmlFor="file" className="cursor-pointer">
                    {selectedFile ? (
                      <div className="space-y-2">
                        <Video className="h-8 w-8 text-primary mx-auto" />
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                        <p className="font-medium">Cliquez pour sélectionner un fichier</p>
                        <p className="text-sm text-muted-foreground">
                          Formats supportés: MP4, AVI, MOV, WebM (max 100MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Titre */}
              <div className="space-y-2">
                <Label htmlFor="title">Titre du clip *</Label>
                <Input
                  id="title"
                  placeholder="Ex: Triple Kill avec Jinx"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description (optionnel)</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez ce qui se passe dans ce clip..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Sélection de game */}
              <div className="space-y-2">
                <Label htmlFor="game">Game associée *</Label>
                <Select value={selectedGameId} onValueChange={setSelectedGameId} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une custom game" />
                  </SelectTrigger>
                  <SelectContent>
                    {games.map((game) => (
                      <SelectItem key={game.id} value={game.id}>
                        <div className="flex items-center space-x-2">
                          <Gamepad2 className="h-4 w-4" />
                          <span>{game.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {new Date(game.date).toLocaleDateString('fr-FR')}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Barre de progression */}
              {uploadStatus === 'uploading' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Upload en cours...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Statut d'upload */}
              {uploadStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2 text-green-500 bg-green-500/10 p-3 rounded-md"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Clip uploadé avec succès ! Redirection...</span>
                </motion.div>
              )}

              {uploadStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2 text-destructive bg-destructive/10 p-3 rounded-md"
                >
                  <AlertCircle className="h-5 w-5" />
                  <span>Erreur lors de l'upload</span>
                </motion.div>
              )}

              {/* Message d'erreur */}
              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {error}
                </div>
              )}

              {/* Bouton d'upload */}
              <Button
                type="submit"
                className="w-full"
                disabled={isUploading || !selectedFile || !title || !selectedGameId}
              >
                {isUploading ? (
                  <>
                    <Upload className="h-4 w-4 mr-2 animate-spin" />
                    Upload en cours...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Uploader le clip
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
    </DiscordGuard>
  )
}
