package com.fridge.graphql.inputs;

public class ShoppingListItemInput {
    private Long id;
    private Long productId;
    private Boolean isAcquired;
    private Integer quantity;

    public ShoppingListItemInput(Long id, Long productId, Boolean isAcquired, Integer quantity) {
        this.id = id;
        this.productId = productId;
        this.isAcquired = isAcquired;
        this.quantity = quantity;
    }

    public ShoppingListItemInput() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Boolean getIsAcquired() {
        return isAcquired;
    }

    public void setIsAcquired(Boolean acquired) {
        isAcquired = acquired;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
