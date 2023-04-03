//package com.fridge.service;
//
//import com.fridge.model.NutritionalValue;
//import com.fridge.model.Product;
//import com.fridge.repository.ProductRepository;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.context.TestPropertySource;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import java.util.List;
//import java.util.Optional;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//@TestPropertySource(locations = {"classpath:application-test.properties"})
//@ActiveProfiles("test")
//public class ProductServiceImplTest {
//
//    @Autowired
//    private ProductService productService;
//
//    @Autowired
//    private ProductRepository productRepository;
//
//    Product product1;
//    Product product2;
//
//    NutritionalValue nutritionalValue;
//    NutritionalValue nutritionalValue2;
//
//    @Before
//    public void init(){
//
//        product1 = new Product();
//        product2 = new Product();
//
//        product1.setName("Banane");
//        product1.setUnit("Stück");
//        product1.setTotalQuantity(1);
//
//        product2.setName("Gurke");
//        product2.setUnit("Stück");
//        product2.setTotalQuantity(1);
//
//        nutritionalValue2 = new NutritionalValue("Top", 100, 0, 0, 10, 0, 0, 75, 15);
//        nutritionalValue = new NutritionalValue("Top", 100, 0, 0, 10, 0, 0, 75, 15);
//
//        product1.setNutritionalValue(nutritionalValue);
//        product2.setNutritionalValue(nutritionalValue2);
//
//        product1.setUserId("a82abb38-4ddb-4a9e-9fb4-0fdf9130964c");
//        product2.setUserId("a82abb38-4ddb-4a9e-9fb4-0fdf9130964c");
//
//    }
//
//    @Test
//    public void productShouldBeSaved(){
//
//        Product savedProduct = productService.saveProduct(product1);
//        assertThat(savedProduct.getName()).isEqualTo(product1.getName());
//        assertThat(savedProduct.getId()).isNotNull();
//
//    }
//
//    @Test
//    public void productShouldbeFetched(){
//
//        productService.saveProduct(product1);
//        List<Product> nutritionalValueList = productService.fetchProducts(product1.getUserId());
//        assertThat(nutritionalValueList).isNotEmpty();
//
//    }
//
//    @Test
//    public void productShouldBeUpdated(){
//
//        Product updatable = productService.saveProduct(product1);
//
//        updatable.setName("Apfel");
//        updatable.setTotalQuantity(10);
//
//        Product updatedProduct = productService.updateProduct(updatable, product1.getUserId());
//
//        Optional<Product> found = productRepository.findById((updatedProduct.getId()));
//
//        assertThat(updatable.getId()).isEqualTo(found.get().getId());
//        assertThat(updatedProduct.getName()).isEqualTo("Apfel");
//        assertThat(found.get().getTotalQuantity()).isEqualTo(updatable.getTotalQuantity());
//        System.out.println(updatable.getTotalQuantity());
//        System.out.println(found.get().getTotalQuantity());
//
//    }
//
//    @Test
//    public void productShouldBeDeleted(){
//
//        Product deletable = productService.saveProduct(product1);
//        productService.deleteProduct(deletable.getId(), product1.getUserId());
//        Optional<Product> found = productRepository.findById(product1.getId());
//        assertThat(found).isEmpty();
//
//    }
//
//    @Test
//    public void oneProductShouldBeFetched(){
//
//        Product fetchable = productService.saveProduct(product1);
//        productService.getProduct(fetchable.getId(), product1.getUserId());
//        Optional<Product> found = productRepository.findById(fetchable.getId());
//        assertThat(found).isNotEmpty();
//        assertThat(found.get().getId()).isNotNull();
//        assertThat(found.get().getName()).isEqualTo(product1.getName());
//
//    }
//
//}
