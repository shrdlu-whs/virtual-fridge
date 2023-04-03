package com.fridge.graphql.mutationresolver;

import com.fridge.graphql.inputs.ShoppingListInput;
import com.fridge.model.ShoppingList;
import com.fridge.service.ShoppingListService;
import com.fridge.util.ObjectMapperUtils;
import graphql.kickstart.tools.GraphQLMutationResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;

@Component
public class ShoppingListMutationResolver implements GraphQLMutationResolver {

    private final ShoppingListService shoppingListService;

    @Autowired
    public ShoppingListMutationResolver(ShoppingListService shoppingListService) {
        this.shoppingListService = shoppingListService;
    }

    public ShoppingList createShoppingList(ShoppingListInput input) {
        String userId = getContext().getAuthentication().getName();
        input.setUserId(userId);
//        ShoppingList tempShoppingList = ObjectMapperUtils.map(input, ShoppingList.class);

        return shoppingListService.saveShoppingList(input);
    }

    public ShoppingList updateShoppingList(ShoppingListInput input) {
        String userId = getContext().getAuthentication().getName();
        input.setUserId(userId);

        return shoppingListService.updateShoppingList(input, userId);
    }

    public Long deleteShoppingList(Long id) {
        String userId = getContext().getAuthentication().getName();
        shoppingListService.deleteShoppingList(id, userId);
        return id;
    }

    // graphiql functions - delete after test -------------------------------------
    public ShoppingList createShoppingListI(ShoppingListInput input, String userId) {
        input.setUserId(userId);

        return shoppingListService.saveShoppingList(input);
    }

    public ShoppingList updateShoppingListI(ShoppingListInput input, String userId) {
        input.setUserId(userId);

        return shoppingListService.updateShoppingList(input, userId);
    }

    public Long deleteShoppingListI(Long id, String userId) {
        shoppingListService.deleteShoppingList(id, userId);
        return id;
    }
}
