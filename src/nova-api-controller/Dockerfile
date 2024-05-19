FROM maven:latest AS build

COPY pom.xml /usr/src/app/
COPY src /usr/src/app/src

WORKDIR /usr/src/app

RUN mvn clean install

FROM openjdk:latest

COPY --from=build /usr/src/app/target/nova-api-controller-0.0.1-SNAPSHOT.jar app.jar

CMD ["java", "-jar", "/app.jar"]