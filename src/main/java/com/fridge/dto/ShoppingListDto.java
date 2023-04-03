package com.fridge.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ShoppingListDto {
    private Long id;
    private String userId;
    private String name;
    private List<ShoppingListItemDto> items;
    private LocalDateTime created;


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

    public List<ShoppingListItemDto> getItems() {
        return items;
    }

    public void setItems(List<ShoppingListItemDto> items) {
        this.items = items;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }
}
