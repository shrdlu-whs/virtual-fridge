package com.fridge.controller;

import com.fridge.dto.ShoppingListDto;
import com.fridge.model.ShoppingList;
import com.fridge.service.ShoppingListService;
import com.fridge.util.ObjectMapperUtils;
//import io.github.resilience4j.bulkhead.annotation.Bulkhead;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ShoppingListController {

    private final ShoppingListService shoppingListService;

    @Autowired
    public ShoppingListController(ShoppingListService shoppingListService) {
        this.shoppingListService = shoppingListService;
    }

    @GetMapping("/shoppingLists")
    public ResponseEntity<List<ShoppingListDto>> getShoppingLists(Principal principal) {
        List<ShoppingList> shoppingListEntities = shoppingListService.fetchShoppingLists(principal.getName());
        List<ShoppingListDto> shoppingListDtos = ObjectMapperUtils.mapAll(shoppingListEntities, ShoppingListDto.class);
        return ResponseEntity.status(HttpStatus.OK).body(shoppingListDtos);
    }

    @GetMapping("/shoppingLists/{id}")
//    @Bulkhead(name="shoppingListBulkhead")
    public ResponseEntity<ShoppingListDto> getShoppingList(@PathVariable("id") Long id, Principal principal) {
        ShoppingList shoppingList = shoppingListService.getShoppingList(id, principal.getName());
        ShoppingListDto responseShoppingListDto = ObjectMapperUtils.map(shoppingList, ShoppingListDto.class);
        return ResponseEntity.status(HttpStatus.OK).body(responseShoppingListDto);
    }

//    @PostMapping("/shoppingLists")
//    public ResponseEntity<ShoppingListDto> createShoppingList(@RequestBody ShoppingListDto shoppingListDto, Principal principal) {
//        ShoppingList shoppingList = ObjectMapperUtils.map(shoppingListDto, ShoppingList.class);
//        shoppingList.setUserId(principal.getName());
//        ShoppingList returnedShoppingList = shoppingListService.saveShoppingList(shoppingList);
//        ShoppingListDto responseShoppingListDto = ObjectMapperUtils.map(returnedShoppingList, ShoppingListDto.class);
//        return ResponseEntity.status(HttpStatus.CREATED).body(responseShoppingListDto);
//    }

//    @PutMapping("/shoppingLists")
//    public ResponseEntity<ShoppingListDto> putShoppingList(@RequestBody ShoppingListDto shoppingListDto, Principal principal) {
//        ShoppingList shoppingList = ObjectMapperUtils.map(shoppingListDto, ShoppingList.class);
//        ShoppingList returnedShoppingList = shoppingListService.updateShoppingList(shoppingList, principal.getName());
//        ShoppingListDto responseShoppingListDto = ObjectMapperUtils.map(returnedShoppingList, ShoppingListDto.class);
//        return ResponseEntity.status(HttpStatus.OK).body(responseShoppingListDto);
//    }

    @DeleteMapping("/shoppingLists/{id}")
    public ResponseEntity<Object> deleteShoppingList(@PathVariable("id") Long id, Principal principal) {
        shoppingListService.deleteShoppingList(id, principal.getName());
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
