# Catmash
Permet de gérer des chats, voter pour eux, et récupérer les scores.

---

## 🧱 Stack technique

- Java 21
- Spring Boot 3
- Spring Data JPA / Hibernate
- PostgreSQL (ou H2 pour dev local)
- Maven
- Docker (optionnel pour déploiement)
- SLF4J / Logback pour le logging

---

## ⚡ Fonctionnalités

- Récupérer tous les chats triés par nombre de votes
- Voter pour un chat
- Gestion des exceptions (404 si chat non trouvé)
- Validation des entrées backend
- Configuration multi-environnement (dev / prod)

---

## 🚀 Setup local

### Prérequis

- JDK 21
- Maven
- PostgreSQL ou H2 pour tests

### Instructions

1. Cloner le repo :

```bash
git clone https://github.com/eperiana/Catmash.git
cd Catmash/api
```

2. Configurer la base de données dans application.properties (H2 pour dev) :
```bash
spring.datasource.url=jdbc:h2:mem:catmash
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
```
3. Build et run :
```bash
mvn clean package
java -jar target/catmash-0.0.1-SNAPSHOT.jar
```
- L’API sera disponible sur http://localhost:8080/api/cats

---
## Endpoints API

| Méthodes | URL                   | Description                                       |
|----------|-----------------------|---------------------------------------------------|
| GET      | `/api/cats`           | Récupère tous les chats triés par nombre de votes |
| POST     | `/api/cats/vote/{id}` | Vote pour un chat par son ID                      |                  |
