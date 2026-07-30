# Use a lightweight Java 17 image
FROM eclipse-temurin:17-jre-alpine

# Set working directory inside the container
WORKDIR /app

# Copy the built jar file into the container
# This assumes you are running the docker build after 'mvn clean install' or 'mvn package'
COPY target/*.jar app.jar

# Expose the default Spring Boot port
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
