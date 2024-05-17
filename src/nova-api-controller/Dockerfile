FROM maven:latest AS build

COPY target/nova-api-controller-0.0.1-SNAPSHOT.jar app.jar

CMD ["java", "-jar", "/app.jar"]