package com.fridge.service;

import com.fridge.graphql.inputs.ShoppingListInput;
import com.fridge.model.ShoppingList;

import java.util.List;

public interface ShoppingListService {

    ShoppingList getShoppingList(Long id, String userId);

    List<ShoppingList> fetchShoppingLists(String userId);

    ShoppingList saveShoppingList(ShoppingListInput shoppingListInput);

    ShoppingList updateShoppingList(ShoppingListInput soppingListInput, String userId);

    void deleteShoppingList(Long id, String userId);

}
