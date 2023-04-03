package com.fridge.graphql.inputs;
import java.util.HashSet;
import java.util.Set;

public class ShoppingListInput {
    private Long id;
    private String userId;
    private String name;
    private Set<ShoppingListItemInput> shoppingListItemInputs;

    public ShoppingListInput(Long id, String userId, String name, Set<ShoppingListItemInput> shoppingListItemInputs) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.shoppingListItemInputs = shoppingListItemInputs;
    }

    public ShoppingListInput() {
        shoppingListItemInputs = new HashSet<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<ShoppingListItemInput> getShoppingListItemInputs() {
        return shoppingListItemInputs;
    }

    public void setShoppingListItemInputs(Set<ShoppingListItemInput> shoppingListItemInputs) {
        this.shoppingListItemInputs = shoppingListItemInputs;
    }
}
