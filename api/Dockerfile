# ===============================
# 🧱 Étape 1 : Build du projet
# ===============================
FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copier le code source
COPY src ./src

# Construire le jar en ignorant les tests
RUN mvn clean package -DskipTests

# ===============================
# 🚀 Étape 2 : Exécution du projet
# ===============================
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copier le jar construit depuis l'étape précédente
COPY --from=builder /app/target/*.jar app.jar

# Définir le profil prod
ENV SPRING_PROFILES_ACTIVE=prod

# Exposer le port défini par Render (variable d'environnement PORT)
EXPOSE 8080

# Démarrer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
