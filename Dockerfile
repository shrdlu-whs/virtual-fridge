  FROM adoptopenjdk:11-jre-hotspot

     WORKDIR /app
     COPY ./target/*.jar app/app.jar

     EXPOSE 5000

     ENTRYPOINT ["java", "-jar", "app/app.jar"]
