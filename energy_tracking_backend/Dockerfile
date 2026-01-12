# Build stage

FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /app

COPY pom.xml .

COPY src ./src

RUN mvn clean package -DskipTests

# Runtime stage

FROM gcr.io/distroless/java21-debian12

WORKDIR /app

COPY --from=builder /app/target/*jar app.jar

EXPOSE 8080

CMD ["app.jar"]
