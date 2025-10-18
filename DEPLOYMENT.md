# 🚀 Guide de Déploiement - Gorki Custom

## ✅ Configuration Terminée

Votre projet Next.js est maintenant prêt pour le déploiement sur Vercel avec :

- ✅ **Next.js 14** avec App Router et TypeScript
- ✅ **PostgreSQL** avec Prisma ORM (schéma corrigé)
- ✅ **NextAuth.js** avec Discord OAuth uniquement
- ✅ **Vercel Blob** pour l'upload de clips
- ✅ **TailwindCSS + shadcn/ui** avec thème sombre néon
- ✅ **Build fonctionnel** (testé et validé)

## 🔧 Variables d'Environnement Vercel

Dans votre dashboard Vercel, ajoutez ces variables :

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://votre-domaine.vercel.app"
NEXTAUTH_SECRET="votre-secret-production"
DISCORD_CLIENT_ID="votre-discord-client-id"
DISCORD_CLIENT_SECRET="votre-discord-client-secret"
BLOB_READ_WRITE_TOKEN="votre-vercel-blob-token"
```

## 📋 Étapes de Déploiement

### 1. Push vers GitHub
```bash
git add .
git commit -m "Initial commit - Gorki Custom ready for deployment"
git push origin main
```

### 2. Vercel déploiera automatiquement
- Vercel détectera le push sur `main`
- Le build se lancera automatiquement
- L'application sera disponible sur votre domaine Vercel

### 3. Configuration de la base de données
```bash
# Connectez-vous à votre terminal Vercel ou utilisez Vercel CLI
npx prisma migrate deploy
```

### 4. (Optionnel) Données de test
```bash
npx prisma db seed
```

## 🔗 URLs de Redirection Discord

Dans votre application Discord, configurez :
- **Production** : `https://votre-domaine.vercel.app/api/auth/callback/discord`

## 🎯 Fonctionnalités Disponibles

### Interface Publique
- **Page d'accueil** : `/` - Présentation avec info Discord
- **Liste des games** : `/games` - Parcourir les custom games
- **Upload de clips** : `/upload` - Réservé aux utilisateurs Discord
- **Statistiques** : `/stats` - Graphiques et classements

### Interface Admin
- **Dashboard** : `/admin/dashboard` - Vue d'ensemble
- **Gestion games** : `/admin/games` - CRUD des custom games
- **Connexion** : `/auth/signin` - Discord OAuth uniquement

## 🛡️ Sécurité

- ✅ **Upload bloqué** pour les non-utilisateurs Discord
- ✅ **Vérification côté serveur** du provider Discord
- ✅ **Authentification obligatoire** pour l'admin
- ✅ **Protection CSRF** avec NextAuth.js

## 🎨 Design

- ✅ **Thème sombre néon** avec ambiance gaming
- ✅ **Animations Framer Motion** fluides
- ✅ **Responsive design** (desktop, tablette, mobile)
- ✅ **UI moderne** avec shadcn/ui

## 📊 Base de Données

Le schéma Prisma inclut :
- **Users** (avec rôles ADMIN/USER)
- **Games** (custom games League of Legends)
- **Teams** (équipes bleue/rouge)
- **Players** (joueurs avec stats)
- **Clips** (vidéos uploadées)
- **Picks/Bans** (sélection de champions)
- **Statistics** (statistiques détaillées)

## 🚨 Points d'Attention

1. **Discord OAuth** : Assurez-vous que votre application Discord est configurée
2. **Base de données** : Vérifiez que PostgreSQL est accessible depuis Vercel
3. **Vercel Blob** : Configurez le storage pour l'upload de clips
4. **Variables d'environnement** : Toutes doivent être définies dans Vercel

## 🆘 Support

En cas de problème :
1. Vérifiez les logs Vercel
2. Testez les variables d'environnement
3. Vérifiez la configuration Discord OAuth
4. Consultez la documentation Prisma pour les migrations

---

**🎮 Votre plateforme Gorki Custom est prête pour la communauté League of Legends !**
