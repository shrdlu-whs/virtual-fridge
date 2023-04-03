package com.fridge.repository;

import com.fridge.model.ShoppingListItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShoppingListItemRepository extends JpaRepository<ShoppingListItem, Long> {
}

