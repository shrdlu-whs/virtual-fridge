package com.fridge.graphql;

import com.fridge.model.Product;
import com.fridge.service.ProductService;
import com.graphql.spring.boot.test.GraphQLResponse;
import com.graphql.spring.boot.test.GraphQLTest;
import com.graphql.spring.boot.test.GraphQLTestTemplate;
import org.junit.Test;
import org.junit.jupiter.api.BeforeAll;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.sql.SQLOutput;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.useDefaultRepresentation;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations = {"classpath:application-test.properties"})
@ActiveProfiles("test")
@RunWith(SpringRunner.class)
//@GraphQLTest
public class ProductQueryTest {

    @Autowired
    private GraphQLTestTemplate graphQLTestTemplate;

    @MockBean
    ProductService productService;

    @Test
    @WithMockUser(username = "test", password = "test", roles = "admin")
    public void getProducts_Authorized_ReturnsProducts() throws IOException {
        Product product = new Product();
        Set<Product> products = new HashSet<>();
        product.setUserId("test");
        product.setId((long) 1);
        product.setName("Produkt");
        products.add(product);

        doReturn(products).when(productService).fetchProducts(any());
        GraphQLResponse response = graphQLTestTemplate.postForResource("test/getProducts.graphql");
        assertThat(response.isOk()).isTrue();
        assertThat(response.get("$.data.products[0].name")).isEqualTo("Produkt");
        assertThat(response.get("$.data.products[0].id")).isEqualTo("1");
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "admin")
    public void getProducts_Unauthorized_ReturnsEmptySet() throws IOException {
        Product product = new Product();
        Set<Product> products = new HashSet<>();
        product.setUserId("nottest");
        product.setId((long) 1);
        product.setName("Produkt");
        products.add(product);

        doReturn(products).when(productService).fetchProducts("nottest");
        GraphQLResponse response = graphQLTestTemplate.postForResource("test/getProducts.graphql");
        assertThat(response.isOk()).isTrue();
        String expected = "{\"data\":{\"products\":[]}}";
        response.assertThatJsonContent().isEqualToJson(expected);
    }
}
