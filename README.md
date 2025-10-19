# Catmash – Vote pour le chat le plus mignon !
## Description du projet

Catmash est une application web full-stack permettant de voter pour le chat le plus mignon 🐾
Deux chats s’affichent à l’écran, l’utilisateur clique sur son préféré, et un classement global se met à jour automatiquement.

Le projet a été conçu entièrement de A à Z, de la conception à la mise en ligne :
- architecture Spring Boot (API) + Angular (Front),
- déploiement conteneurisé avec Docker,
- Nginx pour le service du front,
- Sécurisation de l’API (filtrage par origine),
- CI/CD automatisé via GitHub Actions, 
- hébergement sur Render.

---
## Stack technique
### Back-end (API)
- Java 21
- Spring Boot 3
- Spring Web
- Spring Data JPA (PostgreSQL en production et h2 en dev)
- Spring Security (filtre personnalisé pour l’accès par origine)
- PostgreSQL hébergé sur Render
- Maven pour la gestion des dépendances
- Tests : JUnit 5 + MockMvc
- Conteneurisation : Docker (image Java 21 + JAR packagé)

### Front-end
- Angular 17
- TypeScript / RxJS / Signals API
- SCSS (responsive design & animations)
- Déploiement en static site Render
- Conteneurisation : Docker (serveur Nginx)

### CI/CD
- GitHub Actions
  - build & test de l’API 
  - build Angular (prod)
  - déploiement auto sur Render via API REST
- Secrets GitHub
  - RENDER_API_KEY : clé Render pour les déploiements
- Secrets Render
  - DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD, ALLOWED_ORIGIN_FRONT, SPRING_PROFILES_ACTIVE
---
## Fonctionnalités principales

| Fonctionnalité    | Description                  |
|-------------------|----------------------|
| Bataille de chats | Deux chats affichés, vote instantané          |
| Classement global | Tri automatique par nombre de votes |
| Sécurisation API  | Accès filtré selon l’origine (front autorisé uniquement)          |
| Déploiement Docker | Nginx pour le front, Spring Boot pour l’API |
| CI/CD automatisé   | Build, test et déploiement via GitHub Actions           |
| Interface responsive | Mobile, tablette et desktop |
| Hébergement Rende   | API + front-end + base de données         |

---
## Lancer le projet avec IntelliJ IDEA Community
### Prérequis
- Java 21 
- Node.js 18+ 
- IntelliJ IDEA Community Edition

### 1. Importer le projet
1. Ouvre IntelliJ IDEA Community
2. Clique sur "Open" et sélectionne le dossier racine du projet catmash
3. IntelliJ détectera automatiquement le projet Maven (backend)

### 2. Lancer le backend (Spring Boot)
1. Ouvre le fichier CatmashApplication.java (dans src/main/java/fr/catmash/)
2. Clique sur le bouton Run ▶️ en haut à droite 
3. Le serveur Spring Boot démarre sur http://localhost:8080
4. L’API principale est accessible sur http://localhost:8080/api/cats

### 3. Lancer le frontend (Angular)
1. Ouvre un nouvel onglet de terminal dans IntelliJ (ou VS Code si tu préfères)
2. Navigue dans le dossier /spa 
3. Installe les dépendances et démarre le serveur :
```
npm install
npm start
```
4. Le front s’exécute sur http://localhost:4200

### 4. Base de données
En local, l'application se lancera sur une base de données In Memory H2

---
## Déploiement sur Render
### Architecture Render

| Service            | Type               | Description           |
| ------------------ | ------------------ | --------------------- |
| `catmash-front` | Web Service Docker | Nginx + Angular build |
| `catmash-api`   | Web Service Docker | Spring Boot (Java 21) |
| `catmash-db`   | PostgreSQL         | Base hébergée Render  |

### Déploiement via Docker
Les Dockerfiles sont configurés pour le build des deux parties :
- api/Dockerfile → JAR exécutable Spring Boot 
- spa/Dockerfile → build Angular + serveur Nginx

Le déploiement sur Render utilise ces images directement via GitHub Actions.

---
## Redémarrage Render

Render met automatiquement en veille les conteneurs inactifs.
Lors du premier appel après inactivité, les services peuvent prendre 10–30 secondes à se relancer.

Tu peux “réveiller” ton app en visitant directement :
- le front : https://catmash-front.onrender.com
- l’API : https://catmash-api.onrender.com/api/cats

---
## Auteur

Etienne Perianayagassamy

Premier projet full-stack complet : architecture, conteneurisation, CI/CD et hébergement cloud.
