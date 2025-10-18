#!/bin/bash

echo "🗄️ Configuration de la base de données Gorki Custom..."

# Vérifier que DATABASE_URL est définie
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Erreur: DATABASE_URL n'est pas définie"
    echo "Définissez la variable d'environnement DATABASE_URL"
    exit 1
fi

echo "✅ DATABASE_URL trouvée"

# Générer le client Prisma
echo "🔧 Génération du client Prisma..."
npx prisma generate

# Créer la migration initiale
echo "📝 Création de la migration initiale..."
npx prisma migrate dev --name init

# (Optionnel) Remplir avec des données de test
echo "🌱 Remplissage avec des données de test..."
npx prisma db seed

echo "✅ Base de données configurée avec succès!"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Vérifiez que votre base de données PostgreSQL est accessible"
echo "2. Testez la connexion via la page /debug"
echo "3. Essayez la connexion Discord"
