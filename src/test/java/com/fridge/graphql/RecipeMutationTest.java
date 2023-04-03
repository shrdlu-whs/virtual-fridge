package com.fridge.graphql;

import com.fridge.model.Recipe;
import com.fridge.service.RecipeService;
import com.graphql.spring.boot.test.GraphQLTest;
import com.graphql.spring.boot.test.GraphQLTestTemplate;
import org.junit.jupiter.api.BeforeAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

@GraphQLTest
public class RecipeMutationTest {

    @Autowired
    private GraphQLTestTemplate graphQLTestTemplate;

    @MockBean
    RecipeService recipeService;

    static Recipe recipe = new Recipe();

    @BeforeAll
    static void setUp() {

    }
}
