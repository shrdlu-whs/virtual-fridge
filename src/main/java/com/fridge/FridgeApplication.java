package com.fridge;

import graphql.scalars.ExtendedScalars;
import graphql.schema.idl.RuntimeWiring;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FridgeApplication {

    public static void main(String[] args) {
        RuntimeWiring.newRuntimeWiring().scalar(ExtendedScalars.Date);
        SpringApplication.run(FridgeApplication.class, args);
    }
}
