# ⚽ Plateforme Fan – Coupe du Monde 2026

Une application web moderne et immersive conçue pour connecter les fans de football autour de la Coupe du Monde 2026.
Ce projet met en avant une combinaison de **design UI/UX avancé** et de **bonnes pratiques en développement sécurisé**.

---

## 🚀 Présentation

Cette plateforme propose une expérience centrée utilisateur permettant de :

* Suivre les matchs et l’évolution du tournoi
* Explorer les moments historiques de la Coupe du Monde
* Interagir avec une expérience fan immersive
* Participer à des prédictions et défis

L’objectif est de créer une expérience proche des standards des grandes plateformes sportives.

---

## 🎨 Design

L’interface a été conçue sur Figma avec une approche moderne :

* Hero section immersive
* Layout basé sur des cartes (cards)
* Typographie claire et hiérarchie visuelle forte
* Composants interactifs et cohérents

👉 Design original :
https://www.figma.com/design/oGvyZXFFzEzWCmeNO5RMKX/Landing-Page-for-World-Cup

---

## 🧠 Architecture

Le projet suit une séparation claire des responsabilités :

* **Frontend** → Interface utilisateur et interactions
* **Backend** → Logique métier et sécurité
* **API** → Communication entre frontend et backend

---

## 🔐 Sécurité (côté backend)

La sécurité est gérée côté serveur et non exposée dans l’interface utilisateur.

Principes appliqués :

* Validation et nettoyage des entrées utilisateur
* Protection contre les injections (SQL, XSS, etc.)
* Authentification sécurisée (JWT / sessions)
* Hash des mots de passe (bcrypt)
* Rate limiting (protection brute-force)
* Headers HTTP sécurisés (CSP, HSTS…)

Ces choix s’inspirent des standards modernes de sécurité web.

---

## 🛠️ Stack technique

**Frontend**

* HTML / CSS / JavaScript
  *(ou React / Next.js si applicable)*

**Backend**

* Node.js (Express) *(adaptable selon ton stack)*

**Outils**

* Figma (UI/UX)
* Git & GitHub

---

## ⚙️ Lancer le projet

### 1. Installer les dépendances

```bash
npm install
```

### 2. Lancer le serveur de développement

```bash
npm run dev
```

### 3. Accéder à l’application

```
http://localhost:3000
```

---

## 📂 Structure du projet

```
/project
  /frontend
    index.html
    styles.css
    app.js

  /backend
    server.js
    routes/
    controllers/
```

---

## 💡 Fonctionnalités

* ⚽ Interface de suivi des matchs (concept UI)
* 🌍 Expérience fan internationale
* 🏆 Timeline des moments historiques
* 🎯 Système de prédictions et d’engagement
* 🔐 Architecture pensée pour la sécurité

---

## 📈 Améliorations futures

* Intégration de données en temps réel (API)
* Système complet d’authentification
* Base de données
* Déploiement (cloud / Docker / Vercel)

---

## 👨‍💻 Auteur

Amine Moussaïf
Étudiant en ingénierie logicielle

---

## 📌 Note

Ce projet est un projet de portfolio visant à démontrer :

* Compétences en UI/UX
* Développement frontend
* Compréhension des enjeux de sécurité
* Vision produit

---

## ⭐ Support

Si le projet t’a plu, n’hésite pas à laisser une étoile ⭐ sur le repository !
