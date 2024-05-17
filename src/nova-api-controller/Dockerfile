FROM maven:3.8.5-openjdk-20 AS build

COPY target/nova-api-controller-0.0.1-SNAPSHOT.jar app.jar

CMD ["java", "-jar", "/app.jar"]