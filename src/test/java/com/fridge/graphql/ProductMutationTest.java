package com.fridge.graphql;

import com.fridge.model.Product;
import com.fridge.service.ProductService;
import com.graphql.spring.boot.test.GraphQLTest;
import com.graphql.spring.boot.test.GraphQLTestTemplate;
import org.junit.jupiter.api.BeforeAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

@GraphQLTest
public class ProductMutationTest {

    @Autowired
    private GraphQLTestTemplate graphQLTestTemplate;

    @MockBean
    ProductService productService;

    static Product product = new Product();

    @BeforeAll
    public void setUp() {

    }
}
