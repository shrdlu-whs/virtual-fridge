//package com.fridge.service;
//
//import com.fridge.model.ShoppingList;
//import com.fridge.repository.ShoppingListRepository;
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
//public class ShoppingListServiceImplTest {
//
//    @Autowired
//    private ShoppingListService shoppingListService;
//
//    @Autowired
//    private ShoppingListRepository shoppingListRepository;
//
//    ShoppingList shoppingList1;
//    ShoppingList shoppingList2;
//
//    @Before
//    public void init(){
//
//        shoppingList1 = new ShoppingList();
//        shoppingList2 = new ShoppingList();
//
//        shoppingList1.setName("Einkauf am Freitag");
//        shoppingList2.setName("Einkauf am Dienstag");
//
//        shoppingList1.setUserId("a82abb38-4ddb-4a9e-9fb4-0fdf9130964c");
//        shoppingList2.setUserId("a82abb38-4ddb-4a9e-9fb4-0fdf9130964c");
//
//    }
//
//    @Test
//    public void shoppingListShouldBeSaved(){
//
//        ShoppingList savedShoppingList = shoppingListService.saveShoppingList(shoppingList1);
//        assertThat(savedShoppingList.getName()).isEqualTo(shoppingList1.getName());
//        assertThat(savedShoppingList.getId()).isNotNull();
//
//    }
//
//    @Test
//    public void shoppingListShouldbeFetched(){
//
//        shoppingListService.saveShoppingList(shoppingList1);
//        List<ShoppingList> shoppingListList = shoppingListService.fetchShoppingLists(shoppingList1.getUserId());
//        assertThat(shoppingListList).isNotEmpty();
//
//    }
//
////    @Test
////    public void shoppingListShouldBeUpdated(){
////
////        ShoppingList updatable = shoppingListService.saveShoppingList(shoppingList1);
////
////        updatable.setName("Einkauf am Freitag");
////
////        ShoppingList updatedShoppingList = shoppingListService.updateShoppingList(updatable, shoppingList1.getUserId());
////
////        Optional<ShoppingList> found = shoppingListRepository.findById((updatedShoppingList.getId()));
////
////        assertThat(updatable.getId()).isEqualTo(found.get().getId());
////        assertThat(updatedShoppingList.getName()).isEqualTo("Einkauf am Freitag");
////
////    }
//
//    @Test
//    public void shoppingListShouldBeDeleted(){
//
//        ShoppingList deletable = shoppingListService.saveShoppingList(shoppingList1);
//        shoppingListService.deleteShoppingList(deletable.getId(), shoppingList1.getUserId());
//        Optional<ShoppingList> found = shoppingListRepository.findById(shoppingList1.getId());
//        assertThat(found).isEmpty();
//
//    }
//
//    @Test
//    public void oneShoppingListShouldBeFetched(){
//
//        ShoppingList fetchable = shoppingListService.saveShoppingList(shoppingList1);
//        shoppingListService.getShoppingList(fetchable.getId(), shoppingList1.getUserId());
//        Optional<ShoppingList> found = shoppingListRepository.findById(fetchable.getId());
//        assertThat(found).isNotEmpty();
//        assertThat(found.get().getId()).isNotNull();
//        assertThat(found.get().getName()).isEqualTo(shoppingList1.getName());
//
//    }
//
//}
