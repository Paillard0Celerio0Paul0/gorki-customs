# 🎮 Gorki Custom - Plateforme League of Legends

Une plateforme moderne pour gérer les custom games League of Legends avec upload de clips vidéo, statistiques avancées et interface d'administration.

## ✨ Fonctionnalités

### 🎯 Interface Publique
- **Liste des Games** : Parcourez toutes les custom games avec filtres avancés
- **Upload de Clips** : Partagez vos meilleurs moments avec la communauté
- **Statistiques** : Graphiques interactifs et classements des joueurs
- **Design Responsive** : Interface optimisée pour desktop, tablette et mobile

### 👑 Interface Admin
- **Dashboard** : Vue d'ensemble de l'activité de la plateforme
- **Gestion des Games** : CRUD complet pour les custom games
- **Authentification** : Système de rôles (Admin/User) avec NextAuth.js
- **Modération** : Gestion des clips et utilisateurs

### 🎨 Design & UX
- **Thème Sombre Néon** : Ambiance gaming/cyberpunk avec effets visuels
- **Animations** : Transitions fluides avec Framer Motion
- **UI Moderne** : Composants shadcn/ui avec TailwindCSS
- **Responsive** : Adaptation parfaite sur tous les écrans

## 🛠️ Stack Technique

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Base de données** : PostgreSQL avec Prisma ORM
- **Authentification** : NextAuth.js
- **Upload** : Vercel Blob
- **UI** : TailwindCSS + shadcn/ui + Lucide Icons
- **Graphiques** : Recharts
- **Animations** : Framer Motion
- **État** : Zustand
- **Hébergement** : Vercel

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- PostgreSQL
- Compte Vercel (pour Blob storage)

### 1. Cloner le projet
```bash
git clone <repository-url>
cd gorki-custom
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
Copiez le fichier d'exemple et configurez vos variables :
```bash
cp env.example .env.local
```

Éditez `.env.local` avec vos valeurs :
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/gorki_custom?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Discord OAuth (requis)
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""

# Vercel Blob
BLOB_READ_WRITE_TOKEN=""
```

### 4. Configuration de la base de données
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate dev

# (Optionnel) Remplir avec des données de test
npx prisma db seed
```

### 5. Lancer le serveur de développement
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📦 Déploiement sur Vercel

### 1. Préparation
- Créez un compte sur [Vercel](https://vercel.com)
- Connectez votre repository GitHub
- Configurez une base de données PostgreSQL (Vercel Postgres recommandé)

### 2. Variables d'environnement sur Vercel
Dans le dashboard Vercel, ajoutez les variables suivantes :

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-production-secret"
DISCORD_CLIENT_ID="your-discord-client-id"
DISCORD_CLIENT_SECRET="your-discord-client-secret"
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
```

### 3. Configuration Vercel Blob
1. Dans votre projet Vercel, allez dans "Storage"
2. Créez un nouveau Blob Store
3. Copiez le token et ajoutez-le à vos variables d'environnement

### 4. Déploiement
```bash
# Push vers votre repository
git add .
git commit -m "Initial commit"
git push origin main

# Vercel déploiera automatiquement via GitHub integration
```

### 5. Migration de la base de données en production
```bash
# Appliquer les migrations en production
npx prisma migrate deploy
```

## 🔧 Configuration Discord OAuth (Requis)

### Discord OAuth
1. Allez sur [Discord Developer Portal](https://discord.com/developers/applications)
2. Créez une nouvelle application
3. Dans "OAuth2", ajoutez les URLs de redirection :
   - Développement : `http://localhost:3000/api/auth/callback/discord`
   - Production : `https://your-domain.vercel.app/api/auth/callback/discord`
4. Copiez le Client ID et Secret dans vos variables d'environnement

**Note importante** : L'upload de clips est bloqué pour les utilisateurs non connectés via Discord.

## 📁 Structure du Projet

```
src/
├── app/                    # App Router Next.js
│   ├── (public)/          # Routes publiques
│   │   ├── games/         # Liste et détails des games
│   │   ├── upload/        # Upload de clips
│   │   └── stats/         # Statistiques
│   ├── admin/             # Interface admin
│   │   ├── dashboard/     # Dashboard admin
│   │   └── games/         # Gestion des games
│   ├── api/               # Routes API
│   │   ├── auth/          # NextAuth
│   │   ├── games/         # CRUD games
│   │   └── clips/         # Upload clips
│   └── auth/              # Pages d'authentification
├── components/            # Composants React
│   ├── ui/               # Composants shadcn/ui
│   ├── layout/           # Header, Footer
│   └── providers/        # Providers (NextAuth, etc.)
├── lib/                  # Utilitaires
│   ├── auth.ts          # Configuration NextAuth
│   ├── prisma.ts        # Client Prisma
│   ├── vercel-blob.ts   # Configuration Blob
│   └── store.ts         # Store Zustand
└── types/               # Types TypeScript
```

## 🎮 Utilisation

### Interface Publique
1. **Consulter les Games** : `/games` - Parcourez toutes les custom games
2. **Uploader un Clip** : `/upload` - Partagez vos meilleurs moments
3. **Voir les Stats** : `/stats` - Analysez les performances

### Interface Admin
1. **Dashboard** : `/admin/dashboard` - Vue d'ensemble
2. **Gestion Games** : `/admin/games` - CRUD des custom games
3. **Authentification** : `/auth/signin` - Connexion admin

## 🔒 Sécurité

- Authentification obligatoire pour l'interface admin
- Validation des rôles utilisateur
- Upload sécurisé avec Vercel Blob
- Protection CSRF avec NextAuth.js

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Contactez l'équipe de développement

---

**Développé avec ❤️ pour la communauté League of Legends**
