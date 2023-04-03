package com.fridge.graphql;

import com.fridge.model.Category;
import com.fridge.service.CategoryService;
import com.graphql.spring.boot.test.GraphQLTest;
import com.graphql.spring.boot.test.GraphQLTestTemplate;
import org.junit.jupiter.api.BeforeAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

@GraphQLTest
public class CategoryMutationTest {

    //@Autowired
    //private GraphQLTestTemplate graphQLTestTemplate;

    @MockBean
    CategoryService categoryService;

    static Category category = new Category();

    @BeforeAll
    static void setUp() {

    }
}
