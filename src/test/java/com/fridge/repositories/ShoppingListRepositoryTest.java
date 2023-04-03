//package com.fridge.repositories;
//
//import com.fridge.model.ShoppingList;
//import com.fridge.repository.ShoppingListRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.context.TestPropertySource;
//
//import java.util.List;
//import java.util.Optional;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//@SpringBootTest
//@TestPropertySource(locations = {"classpath:application-test.properties"})
//@ActiveProfiles("test")
//public class ShoppingListRepositoryTest {
//
//    @Autowired
//    private ShoppingListRepository shoppingListRepository;
//
//    private ShoppingList shopping1;
//    private ShoppingList shopping2;
//
//    @BeforeEach
//    public void init(){
//
//        shopping1 = new ShoppingList();
//        shopping2 = new ShoppingList();
//
//        shopping1.setName("Einkauf am Freitag");
//        shopping2.setName("Einkauf am Dienstag");
//
//        shopping1.setUserId("a82abb38-4ddb-4a9e-9fb4-0fdf9130964c");
//        shopping2.setUserId("a82abb38-4ddb-4a9e-9fb4-0fdf9130964c");
//
//    }
//
//    @Test
//    @WithMockUser(username = "test", password = "test", roles = "admin")
//    public void saveShopping() {
//
//        ShoppingList savedShoppingList = shoppingListRepository.save(shopping1);
//
//        assertThat(savedShoppingList.getId()).isNotNull();
//        assertThat(savedShoppingList.getName()).isNotNull();
//        assertThat(savedShoppingList.getCreated()).isNotNull();
//        assertThat(savedShoppingList.getItems()).isNull();
//    }
//
//    @Test
//    @WithMockUser(username = "test", password = "test", roles = "admin")
//    public void fetchShopping(){
//
//
//
//        shoppingListRepository.save(shopping1);
//        shoppingListRepository.save(shopping2);
//
//        List<ShoppingList> found = shoppingListRepository.findAll();
//
//        assertThat(found.isEmpty()).isFalse();
//
//        Optional<ShoppingList> foundById = shoppingListRepository.findById(shopping2.getId());
//
//        assertThat(foundById).isNotNull();
//
//    }
//
//    @Test
//    @WithMockUser(username = "test", password = "test", roles = "admin")
//    public void deleteShopping(){
//
//        shoppingListRepository.save(shopping1);
//
//        shoppingListRepository.delete(shopping1);
//
//        Optional<ShoppingList> found = shoppingListRepository.findById(shopping1.getId());
//
//        assertThat(found).isEmpty();
//
//    }
//
//}
