package com.fridge.repositories;

import com.fridge.model.NutritionalValue;
import com.fridge.model.Product;
import com.fridge.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@TestPropertySource(locations = {"classpath:application-test.properties"})
@ActiveProfiles("test")
class ProductRepositoryTest {

    @Autowired
    private ProductRepository productRepository;

    private NutritionalValue nutritionalValue;
    private NutritionalValue nutritionalValue2;
    private Product product;
    private Product product1;
    private Product product2;

    @BeforeEach
    public void init(){

        product = new Product();

        product.setName("Tomate");
        product.setUnit("Stück");
        product.setTotalQuantity(1);

        nutritionalValue = new NutritionalValue("Top", 100, 0, 0, 10, 0, 0, 75, 15);

        product.setNutritionalValue(nutritionalValue);
        product.setTotalQuantity(50);

        product1 = new Product();
        product2 = new Product();

        product1.setName("Banane");
        product1.setUnit("Stück");
        product1.setTotalQuantity(1);

        product2.setName("Gurke");
        product2.setUnit("Stück");
        product2.setTotalQuantity(1);

        nutritionalValue2 = new NutritionalValue("Top", 100, 0, 0, 10, 0, 0, 75, 15);

        product1.setNutritionalValue(nutritionalValue);
        product2.setNutritionalValue(nutritionalValue2);

    }

    @Test
    public void saveProduct() {

        Product savedProduct = productRepository.save(product);

        assertThat(savedProduct.getId()).isNotNull();
        assertThat(savedProduct.getName()).isNotNull();
        assertThat(savedProduct.getUnit()).isNotNull();
        assertThat(savedProduct.getTotalQuantity()).isNotNull();
    }

    @Test
    public void fetchProduct(){



        productRepository.save(product1);
        productRepository.save(product2);

        List<Product> found = productRepository.findAll();

        assertThat(found.isEmpty()).isFalse();

        Optional<Product> foundById = productRepository.findById(product2.getId());

        assertThat(foundById).isNotNull();

    }

    @Test
    public void deleteAccount(){

        productRepository.save(product1);

        productRepository.delete(product1);

        Optional<Product> found = productRepository.findById(product1.getId());

        assertThat(found).isEmpty();

    }

}
