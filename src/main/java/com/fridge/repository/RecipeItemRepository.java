package com.fridge.repository;

import com.fridge.model.RecipeItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeItemRepository extends JpaRepository<RecipeItem, Long> {
}

