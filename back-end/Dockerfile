# Production code section

# FROM maven:3.8-openjdk-17-slim AS build
# WORKDIR /app
# COPY pom.xml .
# RUN mvn dependency:go-offline
# COPY . .
# RUN mvn package -DskipTests
# FROM openjdk:17-jdk-slim
# WORKDIR /app
# COPY --from=build /app/target/*.jar app.jar
# EXPOSE 8080
# CMD ["java", "-jar", "app.jar"]


# Development code section

FROM maven:3.8-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY . .
FROM maven:3.8-openjdk-17-slim
WORKDIR /app
COPY --from=build /app .
EXPOSE 8080
CMD ["tail", "-f", "/dev/null"]