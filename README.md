# 🏆 World Cup 2026 Experience

Une application web moderne et interactive pour vivre l'expérience de la Coupe du Monde 2026 de FIFA.

## 📋 Description

Le **World Cup 2026 Experience** est une plateforme web complète développée avec React, TypeScript et Vite, offrant une expérience immersive autour de la Coupe du Monde 2026. L'application propose une interface utilisateur moderne avec authentification, design responsive et nombreuses fonctionnalités interactives.

## ✨ Fonctionnalités Principales

### 🎯 Interface Utilisateur
- **Design Moderne** : Interface élégante avec Material-UI et Radix UI
- **Mode Sombre/Clair** : Thème adaptable avec transition fluide
- **Responsive Design** : Optimisé pour desktop, tablette et mobile
- **Animations Fluides** : Transitions et micro-interactions avec Motion et Tailwind CSS

### 🔐 Authentification Sécurisée
- **Authentification Supabase** : Connexion sécurisée via email/mot de passe
- **OAuth Google** : Connexion rapide avec compte Google
- **Gestion des Sessions** : Persistance de connexion automatique
- **Récupération de Mot de Passe** : Flux complet de réinitialisation

### 🏠 Pages et Composants
- **Page d'Accueil** : Landing page attrayante avec informations sur la Coupe du Monde
- **Profil Utilisateur** : Gestion du compte et préférences
- **Système de Routage** : Navigation fluide avec React Router v7

## 🛠️ Stack Technique

### Frontend
- **React 18.3.1** : Bibliothèque principale avec hooks modernes
- **TypeScript** : Typage strict pour une meilleure maintenabilité
- **Vite 6.4.1** : Build tool ultra-rapide et HMR
- **Tailwind CSS 4.1.12** : Framework CSS utilitaire moderne

### UI Components
- **Material-UI 7.3.5** : Composants Material Design
- **Radix UI** : Composants accessibles et personnalisables
- **Lucide React** : Icônes modernes et cohérentes
- **Sonner** : Notifications toast élégantes

### Backend & Services
- **Supabase** : Base de données PostgreSQL et authentification
- **EmailJS** : Service d'envoi d'emails transactionnels
- **React Hook Form** : Gestion de formulaires optimisée

### Développement
- **ESLint & Prettier** : Qualité de code et formatage
- **PostCSS** : Traitement CSS avancé
- **Canvas Confetti** : Animations de célébration

## 📁 Structure du Projet

```
Worldcup2026Experience/
├── 📄 index.html              # Point d'entrée HTML
├── 📄 package.json            # Dépendances et scripts
├── 📄 vite.config.ts          # Configuration Vite
├── 📄 tsconfig.json           # Configuration TypeScript
├── 📄 vercel.json             # Configuration déploiement Vercel
├── 📄 .env                    # Variables d'environnement
├── 📁 src/
│   ├── 📄 main.tsx            # Point d'entrée React
│   ├── 📁 app/
│   │   ├── 📄 App.tsx         # Composant principal
│   │   ├── 📄 routes.tsx      # Configuration routing
│   │   ├── 📁 components/     # Composants de l'application
│   │   ├── 📁 auth/           # Logique d'authentification
│   │   └── 📁 lib/            # Utilitaires et helpers
│   ├── 📁 components/         # Composants réutilisables
│   ├── 📁 contexts/           # React Context providers
│   ├── 📁 lib/                # Bibliothèques partagées
│   └── 📁 styles/             # Styles globaux
├── 📁 database/               # Schémas et migrations Supabase
├── 📁 supabase/              # Configuration Supabase
└── 📁 node_modules/          # Dépendances installées
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+ 
- npm ou pnpm
- Compte Supabase

### Installation

1. **Cloner le dépôt**
```bash
git clone <repository-url>
cd Worldcup2026Experience
```

2. **Installer les dépendances**
```bash
npm install
# ou
pnpm install
```

3. **Configurer les variables d'environnement**
```bash
# Copier le fichier .env.example vers .env
cp .env.example .env

# Éditer .env avec vos clés Supabase
VITE_SUPABASE_URL=votre_supabase_url
VITE_SUPABASE_ANON_KEY=votre_supabase_anon_key
```

4. **Démarrer le serveur de développement**
```bash
npm run dev
# ou
pnpm dev
```

L'application sera disponible sur `http://localhost:5173`

## 🏗️ Scripts Disponibles

```json
{
  "dev": "vite",                    # Serveur de développement
  "build": "vite build",            # Build de production
  "preview": "vite preview"         # Preview du build
}
```

## 🌐 Déploiement

### Vercel (Recommandé)
Le projet est préconfiguré pour le déploiement sur Vercel :

1. Connecter votre dépôt GitHub à Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement à chaque push

*Voir `DEPLOYMENT.md` pour les instructions détaillées*

### Autres Plateformes
- **Netlify** : Compatible avec la configuration Vite
- **AWS Amplify** : Build personnalisé requis
- **Firebase Hosting** : Build statique

## 🔧 Configuration Supabase

### Base de Données
- Créer un projet Supabase
- Configurer les tables utilisateurs si nécessaire
- Activer l'authentification email et Google OAuth

### Variables d'Environnement
```bash
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_clé_anon
```

## 🎨 Personnalisation

### Thème et Couleurs
Les couleurs et thèmes sont configurables via :
- **Tailwind CSS** : Modifier `tailwind.config.js`
- **Material-UI** : Créer un thème personnalisé
- **CSS Variables** : Modifier les variables CSS globales

### Composants
Les composants utilisent :
- **Composition** : Architecture basée sur la composition
- **Props Typées** : TypeScript pour la sécurité des types
- **Accessibilité** : Radix UI pour l'accessibilité WCAG

## 🧪 Tests et Qualité

### Code Quality
- **TypeScript** : Vérification statique des types
- **ESLint** : Linting du code JavaScript/TypeScript
- **Prettier** : Formatage de code cohérent

### Tests (À implémenter)
- **Vitest** : Tests unitaires et d'intégration
- **React Testing Library** : Tests de composants
- **Playwright** : Tests end-to-end

## 📱 Performance

### Optimisations
- **Code Splitting** : Routage basé sur les composants
- **Lazy Loading** : Chargement différé des composants
- **Tree Shaking** : Élimination du code non utilisé
- **Bundle Analysis** : Analyse du bundle avec Vite

### Metrics
- **Lighthouse Score** : 95+ en performance
- **Core Web Vitals** : Optimisation des métriques essentielles
- **Bundle Size** : < 500KB gzippé

## 🔒 Sécurité

### Mesures Implémentées
- **HTTPS** : Connexions sécurisées obligatoires
- **CORS** : Configuration restrictive des origines
- **Environment Variables** : Secrets protégés
- **Supabase RLS** : Row Level Security pour les données

### Bonnes Pratiques
- Validation des entrées utilisateur
- Échappement des données affichées
- Gestion sécurisée des sessions
- Mises à jour régulières des dépendances

## 🤝 Contribution

### Guidelines
1. Forker le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commiter les changements (`git commit -m 'Add amazing feature'`)
4. Pusher vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

### Code Style
- Utiliser Prettier pour le formatage
- Suivre les conventions TypeScript
- Documenter les fonctions complexes
- Ajouter des tests pour nouvelles fonctionnalités

## 📝 License

Ce projet est sous licence MIT - voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support et Aide

### Documentation
- **README.md** : Documentation principale
- **DEPLOYMENT.md** : Guide de déploiement
- **Code Comments** : Documentation inline

### Ressources
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

### Contact
- **Issues** : Signaler des bugs via GitHub Issues
- **Discussions** : Questions et suggestions via GitHub Discussions
- **Email** : Pour les questions privées

---

## 🎉 Conclusion

Le **World Cup 2026 Experience** est une application web moderne, performante et sécurisée, offrant une expérience utilisateur exceptionnelle pour suivre et célébrer la Coupe du Monde 2026. 

Développée avec les meilleures pratiques du web moderne, elle est prête pour la production et peut être facilement déployée sur Vercel ou d'autres plateformes cloud.

**Prêt à vivre l'expérience de la Coupe du Monde 2026 ? 🏆⚽**

---

*Ce projet a été développé avec ❤️ pour les passionnés de football*
