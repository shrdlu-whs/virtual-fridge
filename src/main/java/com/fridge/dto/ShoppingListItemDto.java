package com.fridge.dto;

public class ShoppingListItemDto {
    private Long id;
    private ProductDto product;
    private Integer quantity;
    private Boolean isAcquired;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProductDto getProduct() {
        return product;
    }

    public void setProduct(ProductDto product) {
        this.product = product;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Boolean isAcquired() {
        return isAcquired;
    }

    public void setAcquired(Boolean acquired) {
        isAcquired = acquired;
    }
}
