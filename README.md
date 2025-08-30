# Snack LaZone 🍔

Application web de gestion pour un snack/restaurant, développée avec **React.js** (frontend) et **Laravel** (backend).

## 🚀 Fonctionnalités
- Gestion des produits (CRUD)
- Gestion des commandes
- Interface caissier
- Authentification par rôle (client, caissier, gérant)
- Statistiques journalières

## 🛠️ Technologies
- React.js + TailwindCSS
- Laravel + MySQL
- JWT Authentication

## ▶️ Installation

### Backend (Laravel)
```bash
cd snack-backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### frontend (React.js)
```bash
cd snack-frontend
npm install
npm start


