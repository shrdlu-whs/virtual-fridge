package com.fridge;

import com.fridge.model.NutritionalValue;
import com.fridge.model.Product;
import com.fridge.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@TestPropertySource(locations = {"classpath:application-test.properties"})
@ActiveProfiles("test")
class FridgeApplicationTests {

    @Autowired
    private ProductRepository productRepository;

    @Test
    public void saveProduct() {
        Product product = new Product();
        product.setName("Tomate");
        product.setUnit("Stück");
        product.setTotalQuantity(1);

        var nutritionalValue = new NutritionalValue("Top", 100, 0, 0, 10, 0, 0, 75, 15);

        product.setNutritionalValue(nutritionalValue);
        product.setTotalQuantity(50);

        Product savedProduct = productRepository.save(product);

        assertThat(savedProduct.getId()).isNotNull();
        assertThat(savedProduct.getName()).isNotNull();
        assertThat(savedProduct.getUnit()).isNotNull();
        assertThat(savedProduct.getTotalQuantity()).isNotNull();
    }

}
