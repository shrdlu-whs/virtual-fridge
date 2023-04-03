package com.fridge.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
public class ShoppingList {

    private Long id;
    private String userId;
    private String name;
    private Set<ShoppingListItem> shoppingListItems;
    private LocalDateTime created;

    public ShoppingList() {
        this.shoppingListItems = new HashSet<>();
    }

    public ShoppingList(Long id, String userId, String name, Set<ShoppingListItem> shoppingListItems, LocalDateTime created) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.shoppingListItems = shoppingListItems;
        this.created = created;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column
    @NotNull
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Column
    @NotNull
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    public Set<ShoppingListItem> getShoppingListItems() {
        return shoppingListItems;
    }

    public void setShoppingListItems(Set<ShoppingListItem> items) {
        shoppingListItems = items;
    }

    @Column
    @NotNull
    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    @PrePersist
    public void setCreatedPrePersist() {
        created = LocalDateTime.now();
    }
}
