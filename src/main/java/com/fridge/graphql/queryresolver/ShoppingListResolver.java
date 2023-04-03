package com.fridge.graphql.queryresolver;

import com.fridge.model.Product;
import com.fridge.model.ShoppingList;
import com.fridge.service.ShoppingListService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;

@Component
public class ShoppingListResolver implements GraphQLQueryResolver {

    private final ShoppingListService shoppingListService;

    @Autowired
    public ShoppingListResolver(ShoppingListService shoppingListService) {
        this.shoppingListService = shoppingListService;
    }

    public List<ShoppingList> getShoppingLists() {
        String userId = getContext().getAuthentication().getName();
        List<ShoppingList> shoppingLists = shoppingListService.fetchShoppingLists(userId);
        return shoppingLists;
    }

    public ShoppingList getShoppingList(Long id) {
        String userId = getContext().getAuthentication().getName();
        return shoppingListService.getShoppingList(id, userId);
    }

    // graphiql queries -----------------------------------------------------------

    public List<ShoppingList> getShoppingListsI(String userId) {
        List<ShoppingList> shoppingLists = shoppingListService.fetchShoppingLists(userId);
        return shoppingLists;
    }

    public ShoppingList getShoppingListI(String userId, Long id) {
        return shoppingListService.getShoppingList(id, userId);
    }
}
