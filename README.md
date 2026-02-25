# 💰 CryptoTracker — Application SPA de Cryptomonnaies

Application SPA professionnelle (niveau Production) construite avec **React**, **TypeScript** et **Redux Toolkit**.

## 🚀 Fonctionnalités

| Page | Description |
|------|------------|
| **Accueil** | Affiche les 100 cryptos les plus populaires (CoinGecko API). Recherche en temps réel, sélection de 5 coins max avec persistance localStorage. |
| **Rapports** | Graphique en temps réel (Chart.js) des prix des coins sélectionnés. Polling toutes les 1 seconde. |
| **IA** | Recommandations d'achat par OpenAI basées sur 6 métriques clés. |
| **À propos** | Infos projet et développeur. |

## 🛠 Stack technique

- React 18 + TypeScript
- Redux Toolkit
- React Router v7
- Chart.js + react-chartjs-2
- Axios
- Vite
- CoinGecko API (gratuite)
- OpenAI API (ChatGPT)

## 📦 Installation

```bash
# Cloner le repo
git clone https://github.com/mordehailevy/crypto-tracker.git
cd application\ cryptomonais

# Installer les dépendances
npm install

# Configurer les clés API
cp .env.example .env
# Éditer .env avec ta clé OpenAI
```

## ▶️ Lancement

```bash
# Mode développement
npm run dev

# Build production
npm run build

# Prévisualiser le build
npm run preview
```

## 📁 Architecture

```
src/
  app/            → Store Redux, hooks typés, routing
  features/       → Pages (home, reports, ai, about) — feature-based
  services/       → Couche API (CoinGecko, OpenAI, client HTTP)
  components/     → Composants réutilisables (layout, common)
  hooks/          → Custom hooks partagés
  types/          → Interfaces TypeScript
  styles/         → CSS global
```

## ⚙️ Variables d'environnement

| Variable | Description |
|----------|------------|
| `VITE_COINGECKO_BASE_URL` | URL de base CoinGecko (défaut: `https://api.coingecko.com/api/v3`) |
| `VITE_OPENAI_API_KEY` | Clé API OpenAI pour les recommandations IA |

## 🔑 Points clés d'architecture

- **Feature-Based** : chaque fonctionnalité est isolée avec ses composants, hooks, slice et types.
- **Service Layer** : les appels API sont découplés de l'UI.
- **Memoization** : `React.memo`, `useMemo`, `useCallback` pour optimiser les rendus.
- **Persistence** : les coins sélectionnés sont sauvegardés en `localStorage`.
- **TTL Cache** : la liste des coins est cachée 5 minutes pour éviter les appels API inutiles.
- **Polling propre** : `setInterval` avec cleanup dans `useEffect` pour éviter les memory leaks.
- **Clean Code / SOLID** : SRP, OCP, DIP appliqués partout.

## 📝 Licence

Projet éducatif — usage personnel.

## 🔗 Liens

- **GitHub** : [https://github.com/mordehailevy/crypto-tracker](https://github.com/mordehailevy/crypto-tracker)
- **Déploiement Cloud** : <!-- Ajouter l'URL de déploiement ici (Netlify, Vercel, etc.) -->
