FROM maven:latest AS build

RUN mvn clean install

COPY target/nova-api-controller-0.0.1-SNAPSHOT.jar app.jar

CMD ["java", "-jar", "/app.jar"]