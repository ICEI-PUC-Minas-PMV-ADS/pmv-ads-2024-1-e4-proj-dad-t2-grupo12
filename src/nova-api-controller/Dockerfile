FROM maven:3.2.5-openjdk-17 AS build

COPY target/nova-api-controller-0.0.1-SNAPSHOT.jar app.jar

CMD ["java", "-jar", "/app.jar"]