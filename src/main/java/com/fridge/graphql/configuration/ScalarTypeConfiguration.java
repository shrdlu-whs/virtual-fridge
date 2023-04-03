package com.fridge.graphql.configuration;
import com.fridge.graphql.scalartypes.GraphQLLocalDateTime;
import graphql.scalar.GraphqlLongCoercing;
import graphql.schema.GraphQLScalarType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class ScalarTypeConfiguration {
    @Bean
    public GraphQLScalarType longScalar() {
        return GraphQLScalarType.newScalar()
                .name("Long")
                .description("Long type")
                .coercing(new GraphqlLongCoercing())
                .build();
    }

    @Bean
    public GraphQLScalarType dateScalar() {
        return new GraphQLLocalDateTime();
//                GraphQLScalarType.newScalar()
//                .name("LocalDateTime")
//                .description("LocalDateTime Type")
//                .coercing(new Coercing<LocalDateTime,String>())
//                .build();
    }
}