FROM maven:3.8-openjdk-17-slim
RUN apt-get update && apt-get install -y git
WORKDIR /app
COPY pom.xml ./
RUN mvn dependency:go-offline
COPY . .
CMD ["/bin/bash"]
EXPOSE 8080